import React, { PureComponent } from 'react'
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Line } from 'react-chartjs-2';

class ChartSection1 extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            dataLine: '',
            dataLineTotal: '',
            JDCTotal: '',
            LZDTotal: '',
            SHPTotal: '',
            ATTotal: '',
            AGV003Data: '',
            message: ''
        }
    }
    componentDidMount() {

        this.response1()
        this.response2()
    }
    response1 = () => {
        const { endpoint, message } = this.state
        const temp = message
        //const socket = socketIOClient(endpoint)
        this.props.socket.on('dashboardAGV003', (AGV003) => {
            //console.log(AGV003)

            this.setState({
                AGV003Data: AGV003.agv003[0],
                timeTitle0: '',
                totalOrder0: '',
                timeTitle1: '',
                totalOrder1: '',
                timeTitle2: '',
                totalOrder2: '',
                timeTitle3: '',
                totalOrder3: '',
                timeTitle4: '',
                totalOrder4: '',
                timeTitle5: '',
                totalOrder5: '',
                timeTitle6: '',
                totalOrder6: '',
                timeTitle7: '',
                totalOrder7: '',
                timeTitle8: '',
                totalOrder8: '',
                timeTitle9: '',
                totalOrder9: '',
                timeTitle10: '',
                totalOrder10: '',
                timeTitle11: '',
                totalOrder11: '',
                timeTitle12: '',
                totalOrder12: '',
                timeTitle13: '',
                totalOrder13: '',
                timeTitle14: '',
                totalOrder14: '',
            }, () => {

                //console.log(this.secondsToHms(this.state.InWaitTime))
                //console.group('response2');
                //console.log(data.agv001[0][0].title_th);
                //console.group('response3');
                //console.log(this.state.AGV003Data[12].totalOrder);
                //console.log(JSON.stringify(AGV003));
                //console.groupEnd();
                //console.log(this.state.AGV003Data);

                let newarr = Array();
                let OLTotal = Array();
                let JDCTotal = Array();
                let LZDTotal = Array();
                let SHPTotal = Array();
                let ATTotal = Array();
                this.state.AGV003Data.map((todo, index) =>
                    newarr.push(todo.timeTitle),

                );
                this.state.AGV003Data.map((todo2, index) =>
                    OLTotal.push(todo2.OLTotal)
                );
                this.state.AGV003Data.map((todo2, index) =>
                    JDCTotal.push(todo2.JDCTotal)
                );
                this.state.AGV003Data.map((todo2, index) =>
                    LZDTotal.push(todo2.LZDTotal)
                );
                this.state.AGV003Data.map((todo2, index) =>
                    SHPTotal.push(todo2.SHPTotal)
                );
                this.state.AGV003Data.map((todo2, index) =>
                    ATTotal.push(todo2.ATTotal)
                );
                this.setState({
                    dataLine: newarr,
                    dataLineTotal: OLTotal,
                    JDCTotal: JDCTotal,
                    LZDTotal: LZDTotal,
                    SHPTotal: SHPTotal,
                    ATTotal: ATTotal
                    //SHPTotal: SHPTotal
                })
                //console.log(newarr)

            })
        })
    }
    response2 = () => {
        const { endpoint, message } = this.state
        const temp = message
        
        this.props.socket.on('dashboardAGV006P', (AGV006P) => {
          this.setState({
            AGV006PData: AGV006P.agv006P[0],
          }, () => {
            //console.log(this.state.AGV006PData)
            let newarr = Array();
            let OLTotal = Array();
            let JDCTotal = Array();
            let LZDTotal = Array();
            let SHPTotal = Array();
            let ATTotal = Array();
    
            this.state.AGV006PData.map((todo, index) =>
              newarr.push(todo.timeTitle),
            );
            this.state.AGV006PData.map((todo2, index) =>
              OLTotal.push(todo2.OLTotal)
            );
            this.state.AGV006PData.map((todo3, index) =>
              JDCTotal.push(todo3.JDCTotal)
            );
            this.state.AGV006PData.map((todo4, index) =>
              LZDTotal.push(todo4.LZDTotal)
            );
            this.state.AGV006PData.map((todo5, index) =>
              SHPTotal.push(todo5.SHPTotal)
            );
            this.state.AGV006PData.map((todo6, index) =>
              ATTotal.push(todo6.ATTotal)
            );
    
            this.timeout = setTimeout(() => {
              this.setState({
                dataLineP: newarr,
                dataLineTotalP: OLTotal,
                JDCTotalP: JDCTotal,
                LZDTotalP: LZDTotal,
                SHPTotalP: SHPTotal,
                ATTotalP: ATTotal
              })
            }, 1000);
    
    
          })
        })
      }

    render() {
        const LineData = {

            labels: this.state.dataLine,

            datasets: [
                {
                    label: "Online",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(31, 58, 147, 0.5)",
                    borderColor: "rgba(31, 58, 147)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(31, 58, 147)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 0,
                    pointRadius: 2,
                    pointHitRadius: 10,
                    data: this.state.dataLineTotal
                },
                {
                    label: "Shopee",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(249, 105, 14, 0.6)",
                    borderColor: "rgba(249, 105, 14)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(249, 105, 14)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 0,
                    pointRadius: 2,
                    pointHitRadius: 10,
                    data: this.state.SHPTotal
                },
                {
                    label: "Lazada",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(102, 51, 153, 0.5)",
                    borderColor: "rgba(102, 51, 153)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(102, 51, 153)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 0,
                    pointRadius: 2,
                    pointHitRadius: 10,
                    data: this.state.LZDTotal
                },
                {
                    label: "JD",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(207, 0, 15, 0.5)",
                    borderColor: "rgba(207, 0, 15, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(207, 0, 15, 1)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 0,
                    pointRadius: 2,
                    pointHitRadius: 10,
                    data: this.state.JDCTotal
                },
                {
                    label: "Other",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(0, 230, 64, 0.5)",
                    borderColor: "rgba(0, 230, 64, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 230, 64, 1)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 0,
                    pointRadius: 2,
                    pointHitRadius: 10,
                    data: this.state.ATTotal
                },


            ]
        };

        const dataLineP = {

            labels: this.state.dataLineP,
      
            datasets: [
              {
                label: "Online",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(31, 58, 147, 0.5)",
                borderColor: "rgba(31, 58, 147)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(31, 58, 147)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                pointHoverBorderColor: "rgba(220, 220, 220,1)",
                pointHoverBorderWidth: 0,
                pointRadius: 2,
                pointHitRadius: 10,
                data: this.state.dataLineTotalP
              },
              {
                label: "Shopee",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(249, 105, 14, 0.6)",
                borderColor: "rgba(249, 105, 14)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(249, 105, 14)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                pointHoverBorderWidth: 0,
                pointRadius: 2,
                pointHitRadius: 10,
                data: this.state.SHPTotalP
              },
              {
                label: "Lazada",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(102, 51, 153, 0.5)",
                borderColor: "rgba(102, 51, 153)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(102, 51, 153)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                pointHoverBorderColor: "rgba(220, 220, 220,1)",
                pointHoverBorderWidth: 0,
                pointRadius: 2,
                pointHitRadius: 10,
                data: this.state.LZDTotalP
              },
              {
                label: "JD",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(207, 0, 15, 0.5)",
                borderColor: "rgba(207, 0, 15, 1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(207, 0, 15, 1)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                pointHoverBorderColor: "rgba(220, 220, 220,1)",
                pointHoverBorderWidth: 0,
                pointRadius: 2,
                pointHitRadius: 10,
                data: this.state.JDCTotalP
              },
              {
                label: "Other",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(0, 230, 64, 0.5)",
                borderColor: "rgba(0, 230, 64, 1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(0, 230, 64, 1)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                pointHoverBorderColor: "rgba(220, 220, 220,1)",
                pointHoverBorderWidth: 0,
                pointRadius: 2,
                pointHitRadius: 10,
                data: this.state.ATTotalP
              },
      
      
            ]
          };


        return (
            <MDBRow className="">
                <MDBCol xl="6" md="12" sm="12" className="">
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                            จำนวนเบิก
                  <Line
                                height={150}

                                data={LineData}
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
                                                stepSize: 20,
                                                beginAtZero: true
                                            }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                                fontColor: "black",
                                                fontSize: 12,
                                                //stepSize: 20,
                                                beginAtZero: true
                                            }
                                        }]
                                    }
                                }}
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol xl="6" md="12" sm="12" className="mb-4">
                    <MDBCard className="">
                        <MDBCardBody>
                        จำนวนหยิบ
                  <Line
                                height={150}

                                data={dataLineP}
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
                                                stepSize: 20,
                                                beginAtZero: true
                                            }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                                fontColor: "black",
                                                fontSize: 12,
                                                //stepSize: 20,
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
        )
    }
}

export default ChartSection1