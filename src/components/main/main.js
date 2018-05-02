import React from 'react';
import './main.css'
import 'react-tabs/style/react-tabs.css';
import ReportBuild from '../reportBuild/reportBuild';
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
						Reports
					</Tab>
					<Tab>
						Views
					</Tab>
					<Tab>
						Users
					</Tab>
				</TabList>
				<TabPanel>
					<p>Docs tab</p>
				</TabPanel>
				<TabPanel>
					<ReportBuild/>
				</TabPanel>
				<TabPanel>
					<p>view tab</p>
				</TabPanel>
				<TabPanel>
					<p>user tab</p>
				</TabPanel>
			</Tabs>
		)
	}
}