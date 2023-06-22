import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { useCounterStore } from './store/counterStore';

function App() {
  const { count, posts } = useCounterStore(
    (state) => ({
      count: state.count,
      posts: state.posts,
    }),
    shallow
  );
  const { increment, getPosts, clearStore, multiply } = useCounterStore();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Counter: {count}</h1>

      <button onClick={() => increment(10)}>Increment by 10</button>
      <button onClick={() => clearStore()}>Clear</button>
      <button
        disabled={count === 0}
        onClick={() => {
          if (count === 0) return;
          multiply(2);
        }}
      >
        X2
      </button>

      <hr />
      {posts.splice(0, 90).map((post) => (
        <div
          key={post.id}
          style={{
            background: '#111',
            padding: '1rem',
            marginBottom: '2rem',
            borderRadius: '0.6rem',
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
