import React, { Component } from 'react';
import './App.css';
import SearchContainer from './SearchContainer/SearchContainer';
import SearchResults from './SearchResults/SearchResults'

class App extends Component {

  constructor() {
    super();

    this.state ={
      searchResults: []
    } 
  }

 


  performSearch = async (searchTerm, e) => {
    e.preventDefault();
            try {
                const searchResults = await fetch('http://api.giphy.com/v1/gifs/search?q='+ searchTerm +'&api_key=6mMJlx89rhW3RbY9zbRQ0Ed4DDS7MINN&limit=5'+ searchTerm +' &apikey=STzlRsvfup7hHr4s');
                const searchResultsJSON = await searchResults.json();
                console.log(searchResultsJSON, '<-- Search Results')
                // return searchResultsJSON
                this.setState({
                    searchResults: searchResultsJSON.data
                })
              } catch (err) {
                return err
              }

        }


    componentDidMount () {
      this.performSearch().then((events) => {
          // console.log(events.resultsPage)
        this.setState({events: events.resultsPage.results.event});
      //   console.log('hey')
      }).catch((err) => { 
        console.log(err)
      })
    }
    

  render() {
    return (
      <div className="App">

        <SearchContainer performSearch={this.performSearch}/>
        <SearchResults searchResults = {this.state.searchResults} />
      </div>
    );
  }
}

export default App;
