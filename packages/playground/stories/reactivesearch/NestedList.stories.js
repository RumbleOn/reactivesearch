import React, { Component } from "react";
import { ReactiveBase, NestedList, ReactiveList, SelectedFilters } from "@appbaseio/reactivesearch";
import ResponsiveStory from "./ResponsiveStory";

export default class NestedListDefault extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		ResponsiveStory();
	}

	onData(markerData) {
		const marker = markerData._source;
		return (
			<a
				className="full_row single-record single_record_for_clone"
				key={markerData._id}
			>
				<div className="text-container full_row" style={{ paddingLeft: "10px" }}>
					<div className="text-head text-overflow full_row">
						<span className="text-head-info text-overflow">
							{marker.name ? marker.name : ""} - {marker.brand ? marker.brand : ""}
						</span>
						<span className="text-head-city">{marker.brand ? marker.brand : ""}</span>
					</div>
					<div className="text-description text-overflow full_row">
						<ul className="highlight_tags">
							{marker.price ? `Priced at $${marker.price}` : "Free Test Drive"}
						</ul>
					</div>
				</div>
			</a>
		);
	}

	render() {
		return (
			<ReactiveBase
				app="car-store"
				credentials="cf7QByt5e:d2d60548-82a9-43cc-8b40-93cbbe75c34c"
			>
				<div className="row">
					<div className="col">
						<SelectedFilters componentId="CategorySensor" />
						<NestedList
							componentId="CategorySensor"
							dataField={[this.props.mapping.brand, this.props.mapping.model]}
							title="NestedList"
							{...this.props}
						/>
					</div>

					<div className="col">
						<ReactiveList
							componentId="SearchResult"
							dataField={this.props.mapping.brand}
							title="Results"
							from={0}
							size={20}
							renderItem={this.onData}
							react={{
								and: "CategorySensor"
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

NestedListDefault.defaultProps = {
	mapping: {
		brand: "brand.raw",
		model: "model.raw"
	}
};

NestedListDefault.propTypes = {
	mapping: React.PropTypes.shape({
		brand: React.PropTypes.string,
		model: React.PropTypes.string
	})
};
