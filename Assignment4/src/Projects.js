import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import MainContainer from './MainContainer.js';

class Projects extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidMount(){
        axios.get("https://shielded-tundra-29086.herokuapp.com/projects").then((res) => {
            this.setState({projects:res.data});
        }).catch((err) => {
            console.log("Error: " + err);
        });
    }

    componentWillUnmount(){}

    render(){
        return (
            <div>
                <MainContainer sidebar={this.props.title}>
                <h1 className="page-header">{this.props.title}</h1> 

                <div className="table-responsive overview-table">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.projects.map((project, index) => {
                                let endDate = "";
                                if(project.ProjectEndDate == null) endDate = "n/a";
                                else endDate = moment(project.ProjectEndDate).utc().format('LL');

                                let startDate = moment(project.ProjectStartDate).utc().format('LL');
                                return (
                                    <tr key={index}>
                                        <td>{project.ProjectName}</td>
                                        <td>{project.ProjectDescription}</td>
                                        <td>{startDate}</td>
                                        <td>{endDate}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                </MainContainer>
            </div>            
        );
    }
}

export default Projects;
