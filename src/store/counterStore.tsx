import { create } from 'zustand';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface State {
  posts: Post[];
  count: number;
}

const initialState: State = {
  count: 0,
  posts: [],
};

interface Actions {
  increment: (value: number) => void;
  getPosts: () => Promise<void>;
  clearStore: () => void;
  multiply: (value: number) => void;
}

export const useCounterStore = create<State & Actions>((set, get) => ({
  ...initialState,
  increment: (value: number) =>
    set((state) => ({ count: state.count + value })),
  getPosts: async () => {
    // const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    // const posts = await res.json();

    const posts = await (
      await fetch('https://jsonplaceholder.typicode.com/posts')
    ).json();
    set((state) => ({
      ...state,
      posts,
    }));
  },
  clearStore: () => {
    set(initialState);
  },
  multiply: (value: number) => {
    const { count } = get();
    set({ count: count * value });
  },
}));
