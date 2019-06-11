import React, { Component } from "react";
import { ReactiveBase, MultiLevelMenu, ReactiveList } from "@appbaseio/reactivesearch";
import ResponsiveStory from "./ResponsiveStory";

export default class MultiLevelMenuDefault extends Component {
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
						<MultiLevelMenu
							componentId="CategorySensor"
							dataField={["brand.raw", "vehicleType.raw", "model.raw"]}
							data={[
								{ label: "Volkswagen", value: "volkswagen" },
								{ label: "BMW", value: "bmw" },
								{ label: "Audi", value: "audi" },
								{ label: "Nissan", value: "nissan" },
								{ label: "Fiat", value: "fiat" }
							]}
							{...this.props}
						/>
					</div>

					<div className="col">
						<ReactiveList
							componentId="SearchResult"
							dataField="brand"
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
