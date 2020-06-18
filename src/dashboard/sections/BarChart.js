import React, { PureComponent } from 'react'
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, HorizontalBar } from 'react-chartjs-2';

class BarChart extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            datechart_title: [],
            datechart_in: [],
            datechart_out: []
        }
    }
    componentDidMount() {
        this.response();
        this.response2();
    }
    response = () => {
        const { endpoint, message } = this.state
        const temp = message
        //const socket = socketIOClient(endpoint)
        this.props.socket.on('dashboardAGV002', (AGV002) => {
            this.setState({
                message: 0,
            }, () => {

                let newarr = Array();
                let newarrIn = Array();
                let newarrOut = Array();
                AGV002.agv002[0].map((todo, index) =>
                    newarr.push(todo.title)
                );
                AGV002.agv002[0].map((todo, index) =>
                    newarrIn.push(todo.totalIn)
                );
                AGV002.agv002[0].map((todo, index) =>
                    newarrOut.push(todo.totalOut)
                );
                //console.log(newarr);
                this.setState({
                    datechart_title: newarr,
                    datechart_in: newarrIn,
                    datechart_out: newarrOut
                })

            })
        })
    }
    response2 = () => {
        const { endpoint, message } = this.state
        const temp = message

        this.props.socket.on('dashboardAGV001', (data) => {
            this.setState({
                message: 0,
                total1: 0
            }, () => {
                this.setState({
                    titleth1: data.agv001[0][0].title,
                    titleth2: data.agv001[0][1].title,
                    titleth3: data.agv001[0][2].title_th,
                    titleth4: data.agv001[0][3].title,
                    titleth5: data.agv001[0][4].title,
                    titleth6: data.agv001[0][5].title,
                    titleth7: data.agv001[0][6].title,
                    titleth8: data.agv001[0][7].title,
                    titleth9: data.agv001[0][8].title,
                    titleth10: data.agv001[0][9].title_th,
                    total1: data.agv001[0][0].total,
                    total2: data.agv001[0][1].total,
                    total3: data.agv001[0][2].total,
                    total4: data.agv001[0][3].total,
                    total5: data.agv001[0][4].total,
                    total6: data.agv001[0][5].total,
                    total7: data.agv001[0][6].total,
                    total8: data.agv001[0][7].total,
                    total9: data.agv001[0][8].total,
                    total10: data.agv001[0][9].total,
                }, () => {
                    // const tt = eval(this.state.total3 + this.state.total10)

                    const t01 = parseInt(data.agv001[0][3].total, 10)
                    const t02 = parseInt(data.agv001[0][7].total, 10)
                    const resultPlus1 = this.plus(t01)
                    const resultPlus2 = this.plus(t02)
                    //console.log(t01);
                    this.setState({
                        calIn: resultPlus1.toFixed(),
                        calOut: resultPlus2.toFixed()
                    })
                })
                //console.log(this.state.total3)
                //console.group('response');
                //console.log(data.agv001[0][0].title_th);
                //console.log(data);
                //console.groupEnd();
                //console.log(this.state.AllData[0].title_th);

            })
        })

    }
    plus = (val) => {
        return (val) / 14;
    }

    render() {
        const Bardata = {

            labels: this.state.datechart_title,
            datasets: [
                {
                    label: 'InBoundBill',
                    backgroundColor: 'rgba(31, 58, 147, 0.7)',
                    borderColor: 'rgba(31, 58, 147, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(77, 5, 232, 1)',
                    hoverBorderColor: 'rgba(77, 5, 232, 1)',
                    data: this.state.datechart_in
                },
                {
                    label: 'OutBoundBill',
                    backgroundColor: 'rgba(217, 30, 24, 0.7)',
                    borderColor: 'rgba(217, 30, 24, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(207, 0, 15)',
                    hoverBorderColor: 'rgba(207, 0, 15)',
                    data: this.state.datechart_out
                }
            ],

        };
        const Bardata2 = {
            labels: [this.state.titleth1, this.state.titleth2, this.state.titleth4, this.state.titleth5, this.state.titleth6, this.state.titleth7, this.state.titleth9, this.state.titleth8],
            datasets: [
                {
                    label: "Today's data",
                    data: [this.state.total1, this.state.total2, this.state.total4, this.state.total5, this.state.total6, this.state.total7, this.state.total9, this.state.total8],
                    fill: false,
                    backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(255, 159, 64)',
                        'rgba(255, 205, 86)',
                        'rgba(75, 192, 192)',
                        'rgba(54, 162, 235)',
                        'rgba(153, 102, 255)',
                        'rgba(230, 14, 111)',
                        'rgba(71, 225, 16)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgba(230, 14, 111)',
                        'rgba(71, 225, 167)'
                    ],
                    borderWidth: 1
                }
            ]
        }

        return (
            <>
                <MDBRow className="mb-4">
                    <MDBCol xl="6" md="12" sm="12" className="mb-4">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                ข้อมูลย้อนหลัง
                                <Bar
                                //height={250}
                                    data={Bardata}
                                    options={{
                                        responsive: true,
                                        legend: {
                                            labels: {
                                                fontColor: "black",
                                                fontSize: 10
                                            }
                                        },
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    fontColor: "black",
                                                    fontSize: 10,
                                                    //stepSize: 20,
                                                    //beginAtZero: true
                                                }
                                            }],
                                            xAxes: [{
                                                ticks: {
                                                    fontColor: "black",
                                                    fontSize: 10,
                                                    //stepSize: 20,
                                                    //beginAtZero: true
                                                }
                                            }]
                                        }
                                    }}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol xl="6" md="12" sm="12" className="mb-4">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                ข้อมูลวันปัจจุบัน
                                    <HorizontalBar
                                    data={Bardata2}

                                    options={{
                                        responsive: true,
                                        legend: {
                                            labels: {
                                                fontColor: "black",
                                                fontSize: 12
                                            }
                                        },
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    fontColor: "black",
                                                    fontSize: 12,
                                                    stepSize: 50,
                                                    beginAtZero: true
                                                }
                                            }],
                                            xAxes: [{
                                                ticks: {
                                                    fontColor: "black",
                                                    fontSize: 12,
                                                    stepSize: 50,
                                                    beginAtZero: true
                                                }
                                            }]
                                        }
                                    }}

                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </>
        )
    }
}

export default BarChart