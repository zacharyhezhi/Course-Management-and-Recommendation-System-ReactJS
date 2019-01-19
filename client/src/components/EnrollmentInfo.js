import React, { Component } from 'react';


class EnrollmentInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            enrollment: [],
        }
    }
		// get student's enrollment information
    componentWillMount(props){
      let username = JSON.parse(localStorage.getItem('session-username'))
				fetch('/api/enrollment/' + username)
				.then(res => res.json())
				.then(json => {
						for ( let course of json){
						this.setState({
								enrollment: [...this.state.enrollment, {'code': course.code, 'name': course.name}],
							})
						}
						localStorage.setItem('enrollment', JSON.stringify(this.state.enrollment))
						console.log(JSON.parse(localStorage.getItem('enrollment')))
				})
				.catch((err) => {
					console.log(`Opz, something wrong, the error message is ${err}`);
				});
    }

    render() {
			const data = this.state.enrollment;
      return (
        <div>
					{/* Table for the enrollment history which is CourseID and Course Name */}
					<table  width="50%" className="zebra course_information">
            	<tbody>
                {
									data.map(item => {
										return(
											<tr key={item.code}>
												<td width="20%" id="CourseID">{item.code}</td>
												<td width="80%" id="CourseDitails">{item.name}</td>     
                			</tr>
										)
									})
								}
							</tbody>
					</table>
        </div> 
      );
    }
  }

  export default EnrollmentInfo;