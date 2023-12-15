'use client'
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i'); //i is for case sensitive search

    return allPosts.filter((item) => 
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    )
  }

  const handelSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    )
  }

const handleTagClick = (tagName) => {
  setSearchText(tagName);

  const searchResult = filteredPrompts(tagName);
  setSearchedResults(searchResult);
}

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handelSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList 
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList 
          data={allPosts}
          handleTagClick={handleTagClick
          }
        />
      )}
    </section>
  );
}

export default Feed;
