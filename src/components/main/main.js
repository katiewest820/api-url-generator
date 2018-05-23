import React from 'react';
import './main.css'
import 'react-tabs/style/react-tabs.css';
import CostReport from '../costReport/costReport';
import UtilReport from '../utilReport/utilReport';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Main extends React.Component{

	render(){
		return(
			<Tabs>
				<TabList>
					<Tab>
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
					<CostReport/>
				</TabPanel>
				<TabPanel>
					<UtilReport/>
				</TabPanel>
			</Tabs>
		)
	}
}