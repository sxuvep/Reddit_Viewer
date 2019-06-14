import React from 'react';
import Styles from './PostItem.module.css';
import {
	faComment,
	faThumbsUp,
	faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Remarkable } from 'remarkable';

const PostItem = ({
	title,
	author_fullname,
	num_comments,
	created,
	ups,
	downs,
	thumbnail,
	selftext_html,
}) => {
	return (
		<li>
			{/* <span>
				<img src={thumbnail} alt="pic" />
			</span> */}
			<span className={Styles.title}>{title}</span>
			<span className={Styles.postedBy}>posted by: {author_fullname}</span>
			<p>
				<FontAwesomeIcon icon={faComment} color="grey" />
				<span>{num_comments} Comments</span>

				<span>
					<FontAwesomeIcon icon={faThumbsUp} color="grey" /> {ups}
				</span>

				<span>
					<FontAwesomeIcon icon={faThumbsDown} color="grey" /> {downs}
				</span>
			</p>
		</li>
	);
};
export default PostItem;
