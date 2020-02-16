const React = require('react');

const SEARCH_HOTKEYS = ["s", "/"];
const SEARCH_MAX_SUGGESTIONS = 5;
const SEARCH_PATHS = null;

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      query: "",
      focused: false,
      focusIndex: 0,
      placeholder: "",
      alignRight: true
    };
    // this.onHotkey = this.onHotkey.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleFocus = this.handleFocus.bind(this);
    // this.handleBlur = this.handleBlur.bind(this);
    // this.handleKeyUp = this.handleKeyUp.bind(this);
    // this.unfocus = this.unfocus.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onHotkey);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onHotkey);
  }

  handleChange(event) {
      alert(1);
      console.log(event);
    this.setState({
      query: event.target.value
    });
  }

  handleFocus() {
    this.setState({
      focused: true
    });
  }

  handleBlur() {
    this.setState({
      focused: false
    });
  }

  handleKeyUp(event) {
    const { key } = event;
    const { focusIndex } = this.state;
console.log(key);
    if (key === "Enter") {
      this.go(focusIndex);
    } else if (key === "ArrowUp") {
      this.onUp();
    } else if (key === "ArrowDown") {
      this.onDown();
    } else {
      // sth. else
    }
  }

  unfocus() {
    this.setState({
      focusIndex: -1
    });
  }

  go(i) {
    const { url = '', baseUrl = '/' } = this.props;
    if (!this.showSuggestions) {
      return;
    }
    location.href = `${url}${baseUrl}${this.suggestions[i].path}`;
    this.setState({
      query: "",
      focusIndex: 0
    });
  }
  focus(i) {
    this.setState({
      focusIndex: i
    });
  }

  onUp() {
    const suggestions = this.suggestions;
    if (this.showSuggestions) {
      if (this.state.focusIndex > 0) {
        this.setState(state => ({
          focusIndex: state.focusIndex - 1
        }));
      } else {
        this.setState(state => ({
          focusIndex: suggestions.length - 1
        }));
      }
    }
  }

  onDown() {
    if (this.showSuggestions) {
      if (this.state.focusIndex < this.suggestions.length - 1) {
        this.setState(state => ({
          focusIndex: state.focusIndex + 1
        }));
      } else {
        this.setState({
          focusIndex: 0
        });
      }
    }
  }

  onHotkey(event) {
    if (
      event.srcElement === document.body &&
      SEARCH_HOTKEYS.includes(event.key)
    ) {
      this.textInput.current.focus();
      event.preventDefault();
    }
  }

  getPageLocalePath(page) {
    const locales = undefined;
    for (const localePath in locales || {}) {
      if (localePath !== "/" && page.path.indexOf(localePath) === 0) {
        return localePath;
      }
    }
    return "/";
  }

  isSearchable(page) {
    let searchPaths = SEARCH_PATHS;

    // all paths searchables
    if (searchPaths === null) {
      return true;
    }

    searchPaths = Array.isArray(searchPaths)
      ? searchPaths
      : new Array(searchPaths);

    return (
      searchPaths.filter(path => {
        return page.path.match(path);
      }).length > 0
    );
  }

  get suggestions() {
    const { pageData } = this.props;
    let query = this.state.query;
    query = query.trim().toLowerCase();
    if (!query) {
      return;
    }

    const pages = pageData || [];
    console.log(pages);
    const max = SEARCH_MAX_SUGGESTIONS;
    const reg = new RegExp(['',...[...query].filter(item => item.trim()),''].join('.*'), 'i');
    // const matches = item => item && item.title && item.title.toLowerCase().indexOf(query) > -1;
    const matches = item => item && item.title && reg.test(item.title);
    const res = [];
    for (let i = 0; i < pages.length; i++) {
      if (res.length >= max) break;
      const p = pages[i];

      if (matches(p)) {
        res.push(p);
      } else if (p.headers) {
        for (let j = 0; j < p.headers.length; j++) {
          if (res.length >= max) break;
          const h = p.headers[j];
          if (matches(h)) {
            res.push(
              Object.assign({}, p, {
                path: p.path + "#" + h.slug,
                header: h
              })
            );
          }
        }
      }
    }
    return res;
  }

  get showSuggestions() {
    return this.state.focused && this.suggestions && !!this.suggestions.length;
  }

  renderSuggestionList() {
    const { focusIndex } = this.state;

    return (this.suggestions || []).map((s, i) => {
      return (
        <div
          key={i}
          className={
            i === focusIndex ? "suggestion focused" : "suggestion"
          }
          onMouseDown={() => { this.go(i) }}
          onMouseEnter={() => { this.focus(i) }}
        >
          <a href={s.path} onClick={event => event.preventDefault()}>
            <span className="page-title">{s.title || s.path}</span>
            {s.header && <span className="header">&gt; {s.header.title}</span>}
          </a>
        </div>
      );
    });
  }

  render() {
    const suggestionsList = this.renderSuggestionList();
    return (
      <div className="search-box">
        <input
          onChange={this.handleChange}
          aria-label="Search"
          value={this.state.query}
          className={this.focused ? "focused" : ""}
          placeholder={this.state.placeholder}
          autoComplete="off"
          spellCheck="false"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyUp={this.handleKeyUp}
          ref={this.textInput}
        />
        {this.showSuggestions && (
          <div
            className={
              this.state.alignRight ? "suggestions align-right" : "suggestions"
            }
            onMouseLeave={this.unfocus}
          >
            {suggestionsList}
          </div>
        )}
      </div>
    );
  }
}

module.exports = SearchBox;
