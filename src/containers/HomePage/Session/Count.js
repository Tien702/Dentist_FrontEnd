import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./Count.scss";
class Count extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {  }
       
    render() {
       
        return (
            <div className="count-container">
                <div className='title text-center'>BẢNG GIÁ NHA KHOA ĐÀ NẴNG ƯU ĐÃI TẠI NHA KHOA MINH TIẾN</div>
                <div className='count-table mt-3 mx-1'>
                <table id='customers'>
                    <tbody>
                        <tr>
                            <td>DỊCH VỤ</td>
                            <td>LOẠI RĂNG</td>
                            <td>GIÁ NIÊM YẾT</td>
                            <td>ƯU ĐÃI</td>
                            <td>BẢO HÀNH</td>
                        </tr>
                        <tr>
                            <td rowspan="3">Bọc răng sứ Đà Nẵng</td>
                            <td>Sứ Ziconia Max</td>
                            <td>3.500.000</td><td>3.000.000</td>
                            <td>10 năm</td>
                        </tr>
                        <tr>
                            <td>Sứ Ceramill Fx</td>
                            <td>5.000.000</td>
                            <td>4.000.000</td>
                            <td>10 năm</td>
                        </tr>
                        <tr>
                            <td>Sứ Cercon HT</td>
                            <td>7.000.000</td>
                            <td>5.000.000</td>
                            <td>10 năm</td>
                            </tr>
                            <tr>
                                <td rowspan="2">Tẩy trắng răng Đà Nẵng</td>
                                <td>Laser Đức</td>
                                <td>1.800.000</td>
                                <td>900.000</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Laser Beyond II Whitening Accelerator</td>
                                <td>3.000.000</td><td>1.800.000</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">Trồng răng Implant Đà Nẵng</td>
                                <td>Implant Hàn Quốc – Dentium</td>
                                <td>16.000.000</td>
                                <td>14.000.000</td>
                                <td>10 năm</td>
                            </tr>
                            <tr>
                                <td>Implant Mỹ – Hiossen</td>
                                <td>25.000.000</td>
                                <td>18.000.000</td>
                                <td>25 năm</td>
                            </tr>
                            <tr>
                                <td>Implant Đức – Riter</td>
                                <td>30.000.000</td>
                                <td>25.000.000</td>
                                <td>Trọn đời</td>
                            </tr>
                            <tr>
                                <td rowspan="3">Niềng răng Đà Nẵng</td>
                                <td>Mắc cài kim loại thường</td>
                                <td>16.000.000</td>
                                <td>28tr – 30tr</td>
                                <td>03 năm</td>
                            </tr>
                            <tr>
                                <td>Mắc cài kim loại từ khóa</td>
                                <td>24.000.000</td>
                                <td>30tr – 40tr</td>
                                <td>03 năm</td>
                            </tr>
                            <tr>
                                <td>Mắc cài sứ</td>
                                <td>24.000.000</td>
                                <td>30tr – 40tr</td>
                                <td>03 năm</td>
                            </tr>   
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }

}


const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Count);
