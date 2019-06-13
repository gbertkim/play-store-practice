import React, { Component } from 'react';
import Play from './play/play';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      play: [],
      search: '',
      sort: '',
      genres: '',
      error: null
    }
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  setGenre(genres){
    this.setState({
      genres
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if(this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if(this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    if(this.state.genres) {
      params.push(`genres=${this.state.genres}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;
    console.log(url);

    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          play: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get apps at this time.'
        });
      })

  }

  render() {
    const playApps = this.state.play.map((play, i) => {
      return <Play {...play} key={i}/>
    })
    return (
      <main className="App">
        <h1>Play Store Apps</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Search: </label>
            <input 
              type="text" 
              id="search" 
              name="search" 
              value={this.state.search}
              onChange={e => this.setSearch(e.target.value)}/>

            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="app">App</option>
              <option value="rating">Rating</option>
            </select>

            <label htmlFor='genres'>Genres: </label>
            <select id='genres' name='genres' onChange={e=> this.setGenre(e.target.value)}>
              <option value="">None</option>
              <option value="action">Action</option>
              <option value="puzzle">Puzzle</option>
              <option value="strategy">Strategy</option>
              <option value="casual">Casual</option>
              <option value="arcade">Arcade</option>
              <option value="card">Card</option>
            </select>
            <button type="submit">Search</button>  
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {playApps}
      </main>
    );
  }
}

export default App;