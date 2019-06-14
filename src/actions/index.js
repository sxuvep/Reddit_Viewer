//import fetch from 'isomorphic-fetch';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

//synchronous action creators
export function selectSubreddit(subreddit) {
	return {
		type: SELECT_SUBREDDIT,
		subreddit,
	};
}
export function invalidateSubreddit(subreddit) {
	return {
		type: INVALIDATE_SUBREDDIT,
		subreddit,
	};
}

export function requestPosts(subreddit) {
	return {
		type: REQUEST_POSTS,
		subreddit,
	};
}

export function receivePosts(subreddit, json) {
	return {
		type: RECEIVE_POSTS,
		subreddit,
		posts: json.data.children.map(child => child.data),
		receivedAt: Date.now(),
	};
}

//asynchronous action creator
const fetchPosts = subreddit => dispatch => {
	dispatch(requestPosts(subreddit));
	return fetch(`https://www.reddit.com/r/${subreddit}.json`)
		.then(response => response.json())
		.then(json => dispatch(receivePosts(subreddit, json)));
};

// export const fetchPosts = subreddit => dispatch => {
// 	//change state to notify that app started a request to reddit api
// 	dispatch(requestPosts);
// 	//now get request for given sub reddit from reddit api
// 	return fetch(`https://reddit.com/r/${subreddit}.json`)
// 		.then(response => response.json())
// 		.then(json => dispatch(receivePosts(subreddit, json)));
// };

const shouldFetchPosts = (state, subreddit) => {
	const posts = state.postsBySubreddit[subreddit];
	if (!posts) {
		return true;
	}
	if (posts.isFetching) {
		return false;
	}
	return posts.didInvalidate;
};

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
	if (shouldFetchPosts(getState(), subreddit)) {
		return dispatch(fetchPosts(subreddit));
	}
};
