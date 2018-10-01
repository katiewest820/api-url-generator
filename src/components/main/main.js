import React from 'react';
import './main.css'
import 'react-tabs/style/react-tabs.css';
import CostReport from '../costReport/costReport';
import UtilReport from '../utilReport/utilReport';
import Documentation from '../documentation/documentation';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import logo from './cloudy_logo.png';

export default class Main extends React.Component{

	render(){
		return(
			<div>
			<Tabs defaultIndex={1}>
				<TabList >
					<Tab disabled={true}>
						<p><img src={logo} width="100px" /></p>
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
					<Documentation/>
				</TabPanel>
				<TabPanel>
					<Documentation/>
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