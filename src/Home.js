import React from 'react'
import _ from 'lodash'
import './style.css';

class Home extends React.Component {
	constructor(props) {
		super(props)
	}

	async componentDidMount() {
		await this.load()
	}

	async load() {
		try {
			// 图片类型
			var map = window.RUNTIME.L.map('map', {
				// zoomControl: false,
				zoom: 10,
				attributionControl: false,
				center: [30.56, 120.414],
				attribution: ''
			});

			var imageBounds = [[29.932404, 119.427919], [31.170337, 121.400178]];
			window.RUNTIME.L.imageOverlay('file-1662012473.svg', imageBounds, { opacity: 1, zIndex: 20 }).addTo(map);

			let data = {
				"type": "FeatureCollection",
				"features": [
					{
						id: 1,
						"type": "Feature",
						"properties": {},
						"geometry": {
							"coordinates": [120.59331580956177, 30.641185837114074],
							"type": "Point"
						}
					},
					{
						id: 2,
						"type": "Feature",
						"properties": {},
						"geometry": { "coordinates": [120.18297838468365, 30.73964499648899], "type": "Point" }
					},
					{
						id: 3,
						"type": "Feature",
						"properties": {},
						"geometry": { "coordinates": [120.0641440342931, 30.441546455763128], "type": "Point" }
					},
					{
						id: 4,
						"type": "Feature",
						"properties": {},
						"geometry": { "coordinates": [120.49377593441695, 30.4507530929261], "type": "Point" }
					}
				]
			}

			let first = data.features.find(p => p.id === 1);
			for (var i = 0; i < 300; i++) {
				let n = {
					id: i + 4,
					type: first.type,
					properties: first.properties,
					geometry: first.geometry
				};
				data.features.push(n);
			}

			let second = data.features.find(p => p.id === 2);
			for (var i = 0; i < 100; i++) {
				let n = {
					id: data.features.length + 4,
					type: second.type,
					properties: second.properties,
					geometry: second.geometry
				};
				data.features.push(n);
			}

			let three = data.features.find(p => p.id === 3);
			for (var i = 0; i < 50; i++) {
				let n = {
					id: data.features.length + 4,
					type: three.type,
					properties: three.properties,
					geometry: three.geometry
				};
				data.features.push(n);
			}

			let four = data.features.find(p => p.id === 4);
			for (var i = 0; i < 120; i++) {
				let n = {
					id: data.features.length + 4,
					type: four.type,
					properties: four.properties,
					geometry: four.geometry
				};
				data.features.push(n);
			}

			var locations = data.features.map(function (rat) {
				var location = rat.geometry.coordinates.reverse();
				// location.push(0.5);
				return location;
			});
			var heat = window.RUNTIME.L.heatLayer(locations, { radius: 35, blur: 25, maxZoom: 17 });
			map.addLayer(heat);

			let features = _.groupBy(data.features, 'geometry.coordinates');
			let tooltips = [];
			_.each(features, (p, k) => {
				let point = [Number(_.first(k.split(','))), Number(_.last(k.split(',')))];
				var tooltip = window.RUNTIME.L.tooltip({
					direction: 'top',
					opacity: 0.8,
					className: 'leaflet-label',
				})
				tooltip.setContent(`人数：${p.length}人`);
				tooltip.setLatLng(new window.RUNTIME.L.LatLng(point[0], point[1]));
				tooltips.push(tooltip);
			})
			window.RUNTIME.L.tooltip(tooltips, map);
			map.on('mouseover', e => {
				console.log(e)
				tooltips.map(p => {
					map.openTooltip(p);
				})
			})

			map.on('mouseout', e => {
				tooltips.map(p => {
					map.closeTooltip(p);
				})
			})
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (
			<div id="map" style={{ height: '100vh' }} />
		)
	}
}

export default Home
