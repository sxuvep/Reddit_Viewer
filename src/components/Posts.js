import React from 'react';
import styles from './Posts.module.css';
import PostItem from './PostItem';
const Posts = ({ posts }) => (
	<ul>
		{posts.map((post, i) => (
			<PostItem key={i} {...post} />
		))}
	</ul>
);
export default Posts;
