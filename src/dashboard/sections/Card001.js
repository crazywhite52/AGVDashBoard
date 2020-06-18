import React, { PureComponent } from 'react'
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText, MDBListGroup, MDBListGroupItem, MDBBadge, MDBTypography } from 'mdbreact';

class Card001 extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            titleth1: '',
            titleth2: '',
            titleth3: '',
            titleth4: '',
            titleth5: '',
            titleth6: '',
            titleth7: '',
            titleth8: '',
            titleth9: '',
            titleth10: '',
            total1: 0,
            total2: 0,
            total3: '00:00:00',
            total4: 0,
            total5: 0,
            total6: 0,
            total7: 0,
            total8: 0,
            total9: 0,
            total10: '00:00:00',
            In: 0,
            Out: 0,
            total_wait: 0,
            loading: false
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        this.getapidata()
        this.getapidata2()
    }
    plus = (val) => {
        return (val) / 14;
    }
    secondsToHms = (seconds) => {
        if (!seconds) return '00:00:00';
        let duration = seconds;
        let hours = duration / 3600;
        duration = duration % (3600);
        let min = parseInt(duration / 60);
        duration = duration % (60);
        let sec = parseInt(duration);
        //console.log(min);

        if (min < 0) {
            return '00:00:00';
        } else {

            if (sec < 10) {
                sec = `0${sec}`;
            }
            if (min < 10) {
                min = `0${min}`;
            }

            if (parseInt(hours, 10) > 0) {
                return `${parseInt(hours, 10)}:${min}:${sec}`
            }
            else if (min == 0) {
                return `00:00:${sec}`
            }
            else {
                return `00:${min}:${sec}`
            }
        }
    }
    getapidata = () => {
        const { endpoint } = this.state

        //const socket = socketIOClient(endpoint)
        this.props.socket.on('dashboardAGV001', (data) => {

            const t01 = parseInt(data.agv001[0][3].total, 10)
            const t02 = parseInt(data.agv001[0][7].total, 10)
            const resultPlus1 = this.plus(t01)
            const resultPlus2 = this.plus(t02)

            this.timeout = setTimeout(() => {
                this.setState({
                    In: resultPlus1.toFixed(),
                    Out: resultPlus2.toFixed(),
                    titleth1: data.agv001[0][0].title,
                    titleth2: data.agv001[0][1].title,
                    titleth3: data.agv001[0][2].title,
                    titleth4: data.agv001[0][3].title,
                    titleth5: data.agv001[0][4].title,
                    titleth6: data.agv001[0][5].title,
                    titleth7: data.agv001[0][6].title,
                    titleth8: data.agv001[0][7].title,
                    titleth9: data.agv001[0][8].title,
                    titleth10: data.agv001[0][9].title,
                    total1: data.agv001[0][0].total,
                    total2: data.agv001[0][1].total,
                    total3: this.secondsToHms(data.agv001[0][2].total),
                    total4: data.agv001[0][3].total,
                    total5: data.agv001[0][4].total,
                    total6: data.agv001[0][5].total,
                    total7: data.agv001[0][6].total,
                    total8: data.agv001[0][7].total,
                    total9: data.agv001[0][8].total,
                    total10: this.secondsToHms(data.agv001[0][9].total),
                }, () => {
                    this.setState({
                        loading: false
                    })
                })
            }, 1000)
        })

    }
    getapidata2 = () => {
        const { endpoint, message } = this.state
        const temp = message

        this.props.socket.on('waitToagv', (Wtagv) => {
            //console.log(Wtagv.agvonline[0].total_wait)
            this.setState({
                total_wait: Wtagv.agvonline[0].total_wait
            })
        })
    }
    render() {

        const spiner = <>
            <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </>
        return (
            <>
                <MDBRow className="mb-4">
                    <MDBCol xl="3" md="12" sm="12" className="mb-r">
                        <MDBCard className="cascading-admin-card cardAd-color">
                            <div className="">
                                {/* <img width="95" src="https://lh3.googleusercontent.com/proxy/ObMf5QyK73Swq3Ero8tmxj8RnmiwnLF1lsdK7rysWxaEaQDJrUmOUo0YsLi7i_FALSge4Eq_B5wB1Sih4gitNXG5-h9CD4Y8JbXeA5A8cSWWXfQa3jFBp3MOlws5" alt="" ></img> */}
                                {/* <MDBIcon icon="cart-arrow-down" className="success-color" /> */}
                                <div className="hcard">
                                    <MDBRow style={{ width: '' }}>
                                        <MDBCol size="6" style={{ 'padding-left': '5px', 'padding-right': '5px' }}>
                                            <div className="text-center"><p>{this.state.titleth1}</p></div>
                                            <MDBTypography className="scolor" tag='h1' variant="h1">
                                                <div className="text-center">{this.state.loading === true ? spiner : <strong>{this.state.total1}</strong>}</div>
                                            </MDBTypography>
                                            {/* <h2 className="scolor">
                                                <div className="text-center"><strong className="">{this.state.total1}</strong></div>
                                            </h2> */}
                                        </MDBCol>
                                        <MDBCol size="6" style={{ 'padding-left': '5px', 'padding-right': '5px' }}>
                                            <div className="text-center"><p>{this.state.titleth4}</p></div>
                                            <MDBTypography className="scolor" tag='h1' variant="h1">

                                                <div className="text-center">{this.state.loading === true ? spiner : <strong>{this.state.total4}</strong>} </div>
                                            </MDBTypography>
                                        </MDBCol>
                                    </MDBRow>

                                </div>
                            </div>

                        </MDBCard>
                    </MDBCol>
                    <MDBCol xl="3" md="12" className="mb-r">
                        <MDBCard className="cascading-admin-card cardAd-color">
                            <div className="">
                                {/* <MDBIcon icon="sign-out-alt" className="danger-color" /> */}
                                <div className="hcard">
                                    <MDBRow style={{ width: '' }}>
                                        <MDBCol size="6" style={{ 'padding-left': '2px', 'padding-right': '2px' }}>
                                            <div className="text-center"><p>{this.state.titleth7}</p></div>
                                            <MDBTypography className="scolor1" tag='h1' variant="h1">
                                                <div className="text-center">{this.state.loading === true ? spiner : <strong className="">{this.state.total7}</strong>}</div>
                                            </MDBTypography>
                                        </MDBCol>
                                        <MDBCol size="6" style={{ 'padding-left': '5px', 'padding-right': '5px' }}>
                                            <div className="text-center"><p>{this.state.titleth8}</p></div>
                                            <MDBTypography className="scolor1" tag='h1' variant="h1">
                                                <div className="text-center">{this.state.loading === true ? spiner : <strong>{this.state.total8}</strong>}</div>
                                            </MDBTypography>
                                        </MDBCol>
                                    </MDBRow>
                                </div>
                            </div>

                        </MDBCard>
                    </MDBCol>
                    <MDBCol xl="6" md="12" sm="12" className="mb-r">
                        <MDBCard className="cascading-admin-card cardAd-color">
                            <div className="">
                                {/* <MDBIcon icon="clock" className="warning-color lighten-1" /> */}
                                <div className="hcard">
                                    <MDBRow style={{ width: '' }}>
                                        <MDBCol size="6" style={{ 'padding-left': '5px', 'padding-right': '5px' }}>
                                            <div className="text-center"><p>{this.state.titleth6}</p></div>
                                            <MDBTypography className="scolor2" tag='h1' variant="h1">
                                                <div className="text-center">{this.state.loading === true ? spiner : <strong className="">{this.state.total6}</strong>}</div>
                                            </MDBTypography>
                                        </MDBCol>
                                        <MDBCol size="6" style={{ 'padding-left': '5px', 'padding-right': '5px' }}>
                                            <div className="text-center"><p>{this.state.titleth9}</p></div>
                                            <MDBTypography className="scolor2" tag='h1' variant="h1">
                                                <div className="text-center">{this.state.loading === true ? spiner : <strong>{this.state.total9}</strong>}</div>
                                            </MDBTypography>
                                        </MDBCol>
                                    </MDBRow>
                                </div>
                            </div>

                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                    <MDBCol xl="6" md="12" sm="12" className="mb-r">
                        <MDBCard className="cascading-admin-card3">
                            <div className="">
                                <div className="hcard1">
                                    <MDBRow>
                                        <MDBCol size="6" style={{ width: '','padding-right':'0px' }}>
                                            <div style={{ width: '' }} className="text-center"><p style={{ 'margin-top': '10px', 'margin-bottom': '0px' }}>{this.state.titleth3}</p></div>
                                            <MDBTypography style={{ width: '', 'margin-left': '0px' }} className="scolor3" tag='h1' variant="h1">
                                                <div className="text-center">{this.state.loading === true ? spiner : <strong>{this.state.total3}</strong>}</div>
                                            </MDBTypography>
                                            <div style={{ width: '' }} className="text-center"><p style={{ 'margin-top': '10px', 'margin-bottom': '0px' }}>{this.state.titleth10}</p></div>
                                            <MDBTypography style={{ width: '', 'margin-left': '0px' }} className="scolor3" tag='h1' variant="h1"><div className="text-center">{this.state.loading === true ? spiner : <strong>{this.state.total10}</strong>}</div></MDBTypography>
                                        </MDBCol>
                                        <MDBCol size="6" style={{ width: '' }}>
                                            <div className="text-center"><p style={{ 'margin-top': '10px', 'margin-bottom': '0px' }}>In bill/hr.</p></div>
                                            <MDBTypography className="scolor3" tag='h1' variant="h1"><div className="text-center">{this.state.loading === true ? spiner : <strong>{this.state.In}</strong>}</div></MDBTypography>
                                            <div className="text-center"><p style={{ 'margin-top': '10px', 'margin-bottom': '0px' }}>Out Order/hr.</p></div>
                                            <MDBTypography className="scolor3" tag='h1' variant="h1"><div className="text-center">{this.state.loading === true ? spiner : <strong>{this.state.Out}</strong>}</div></MDBTypography>
                                        </MDBCol>
                                    </MDBRow>
                                </div>
                            </div>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                    <MDBCol xl="6" md="12" sm="12" className="">
                        <MDBCard className="cascading-admin-card4 ">
                            <div className="">
                                <div className="hcard1">
                                    <MDBRow>
                                        <MDBCol size="6" style={{ width: '' }}>
                                            <div style={{ width: '' }} className="text-center"><p>{this.state.titleth2}</p></div>
                                            <MDBTypography style={{ width: '' }} className="scolor4" tag='h1' variant="h1"><div className="text-center">{this.state.loading === true ? spiner : <strong>{this.state.total2}</strong>}</div></MDBTypography>
                                            <div style={{ width: '' }} className="text-center"><p>{this.state.titleth5}</p></div>
                                            <MDBTypography style={{ width: '' }} className="scolor4" tag='h1' variant="h1"><div className="text-center">{this.state.loading === true ? spiner : <strong>{this.state.total5}</strong>}</div></MDBTypography>
                                        </MDBCol>
                                        <MDBCol size="6">
                                            <div className="text-center"><p>ออเดอร์รอเข้า AGV</p></div>
                                            <div className="text-center"> <MDBTypography tag='h1' variant="h1" colorText="red" >{this.state.loading === true ? spiner : <strong>{this.state.total_wait}</strong>}</MDBTypography></div>
                                        </MDBCol>
                                    </MDBRow>
                                </div>
                            </div>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

            </>
        )
    }
}

export default Card001