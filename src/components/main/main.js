import React from 'react';
import './main.css'
import 'react-tabs/style/react-tabs.css';
import CostReport from '../costReport/costReport';
import UtilReport from '../utilReport/utilReport';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Main extends React.Component{

	render(){
		return(
			<div>
			<Tabs defaultIndex={1}>
				<TabList >
					<Tab disabled={true}>
						<p><img src="https://image.ibb.co/csLJEd/Image_2018_06_13_at_12_47_29_PM.png" width="100px" /></p>
					</Tab>
					<Tab >
						<p>Documentation</p>
					</Tab>
					<Tab>
						<p>Cost Reports</p>
					</Tab>
					<Tab>
						<p>Utilization Reports</p>
					</Tab>
				</TabList>
				<TabPanel>
					<p>Docs tab</p>
				</TabPanel>
				<TabPanel>
					<p>Docs tab</p>
				</TabPanel>
				<TabPanel>
					<CostReport/>
				</TabPanel>
				<TabPanel>
					<UtilReport/>
				</TabPanel>
			</Tabs>
			</div>
		)
	}
}