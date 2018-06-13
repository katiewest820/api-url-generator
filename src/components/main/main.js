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
						<img src="https://image.ibb.co/csLJEd/Image_2018_06_13_at_12_47_29_PM.png" height="50px" />
					</Tab>
					<Tab >
						Documentation
					</Tab>
					<Tab>
						Cost Reports
					</Tab>
					<Tab>
						Utilization Reports
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