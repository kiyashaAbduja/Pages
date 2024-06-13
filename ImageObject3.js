import React, { Component } from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import one from '../assets/one.jpg';
import two from '../assets/two.jpg';
import three from '../assets/three.jpg';
import four from '../assets/four.jpg';
import five from '../assets/five.jpg';
import six from '../assets/six.jpg';
import seven from '../assets/seven.jpg';
import eight from '../assets/eight.jpg';
import nine from '../assets/nine.avif';
import ten from '../assets/ten.jpg';
import eleven from '../assets/eleven.jpg';
import tweleve from '../assets/tweleve.webp';
import ImageCard from './ImageCard';
import { object } from '../utils/ImageObject';

class ImageGrid2 extends Component {
    state = {
        modalOpen: false,
        currentImage: null,
        currentIndex: null,
        totalImages: 0,
        validImages: []
    };

    componentDidMount() {
        const validImages = this.getValidImages();
        this.setState({
            totalImages: validImages.length,
            validImages
        });
    }

    getValidImages = () => {
        const validImages = [];
        Object.keys(object).forEach(hour => {
            Object.keys(object[hour]).forEach(index => {
                const image = object[hour][index];
                if (image.screenShot !== null && image.screenShot !== 'manual time button') {
                    validImages.push({
                        hour,
                        index,
                        image: image.screenShot.file
                    });
                }
            });
        });
        return validImages;
    };

    openModal = (hour, index) => {
        const { validImages } = this.state;
        const globalIndex = validImages.findIndex(img => img.hour === hour && img.index == index);
        if (globalIndex !== -1) {
            this.setState({
                modalOpen: true,
                currentImage: validImages[globalIndex].image,
                currentIndex: globalIndex
            });
        }
    };

    closeModal = () => {
        this.setState({ modalOpen: false });
    };

    showNextImage = () => {
        const { currentIndex, validImages } = this.state;
        const nextIndex = (currentIndex + 1) % validImages.length;
        this.setState({
            currentImage: validImages[nextIndex].image,
            currentIndex: nextIndex
        });
    };

    showPrevImage = () => {
        const { currentIndex, validImages } = this.state;
        const prevIndex = (currentIndex - 1 + validImages.length) % validImages.length;
        this.setState({
            currentImage: validImages[prevIndex].image,
            currentIndex: prevIndex
        });
    };

    render() {
        return (
            <Container>
                {Object.keys(object).map(hour => (
                    <div key={hour} className="hour-section">
                        <h2>{`${hour}:00`}</h2>
                        <Row>
                            {Object.keys(object[hour]).map(index => (
                                <Col sm="2" key={index}>
                                    <ImageCard
                                        hour={hour}
                                        index={index}
                                        image={object[hour][index].screenShot?.file}
                                        startTime={object[hour][index].startTime}
                                        endTime={object[hour][index].endTime}
                                        openModal={this.openModal}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
                {this.state.modalOpen && (
                    <Modal isOpen={this.state.modalOpen} toggle={this.closeModal}>
                        <ModalHeader toggle={this.closeModal}>Image</ModalHeader>
                        <ModalBody>
                            <img src={this.state.currentImage} alt="" className="modal-image" />
                            <p>{this.state.currentIndex}/{this.state.totalImages}</p>

                            <Button color="primary" onClick={this.showPrevImage}>Previous</Button>
                            <Button color="primary" onClick={this.showNextImage}>Next</Button>
                        </ModalBody>
                    </Modal>
                )}
            </Container>
        );
    }
}

export default ImageGrid2;
