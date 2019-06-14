import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	selectSubreddit,
	fetchPostsIfNeeded,
	invalidateSubreddit,
} from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class App extends Component {
	componentDidMount() {
		const { dispatch, selectedSubreddit } = this.props;
		dispatch(fetchPostsIfNeeded(selectedSubreddit));
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
			const { dispatch, selectedSubreddit } = this.props;
			dispatch(fetchPostsIfNeeded(selectedSubreddit));
		}
	}

	handleChange = nextSubreddit => {
		this.props.dispatch(selectSubreddit(nextSubreddit));
	};

	handleRefreshClick = e => {
		e.preventDefault();

		const { dispatch, selectedSubreddit } = this.props;
		dispatch(invalidateSubreddit(selectedSubreddit));
		dispatch(fetchPostsIfNeeded(selectedSubreddit));
	};

	render() {
		const { selectedSubreddit, items, isFetching, lastUpdated } = this.props;
		const isEmpty = items.length === 0;
		return (
			<div>
				<Picker
					value={selectedSubreddit}
					onChange={this.handleChange}
					options={['reactjs', 'frontend']}
				/>
				<p>
					{lastUpdated && (
						<span>
							Last updated at{' '}
							{new Date(lastUpdated).toLocaleTimeString()}.{' '}
						</span>
					)}
					{!isFetching && (
						<button onClick={this.handleRefreshClick}>Refresh</button>
					)}
				</p>
				{isEmpty ? (
					isFetching ? (
						<h2>Loading...</h2>
					) : (
						<h2>Empty.</h2>
					)
				) : (
					<div style={{ opacity: isFetching ? 0.5 : 1 }}>
						<Posts posts={items} />
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { selectedSubreddit, postsBySubreddit } = state;
	console.log(postsBySubreddit[selectedSubreddit]);
	const { isFetching, lastUpdated, items } = postsBySubreddit[
		selectedSubreddit
	] || {
		isFetching: true,
		items: [],
	};

	return {
		selectedSubreddit,
		items,
		isFetching,
		lastUpdated,
	};
};

export default connect(mapStateToProps)(App);
