import './css/style.css';
import { Component } from 'react';
import { PostCard } from './components/PostCard';
import { Header } from './components/Header';


class App extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    });

    this.setState({ posts: postsAndPhotos });
  }

  render() {
    const { posts } = this.state;

    return <div className='App'>
      <Header />
      <section className="container p-4">
        <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-8'>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              body={post.body}
              id={post.id}
              cover={post.cover}
            />
          ))}
        </div>
      </section>
    </div>
  }
}

export default App;