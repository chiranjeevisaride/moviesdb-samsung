 {
          this.state.ModalVisibleStatus ?
            (
              <Modal
                transparent={false}

                animationType={"fade"}

                visible={this.state.ModalVisibleStatus}

                onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} >

                <View style={styles.modalView}>

                  <Image style={styles.mainImage} source={{ uri: this.state.TempImageURL }} />

                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.TouchableOpacity_Style}
                    onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} >

                    <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/close_button.png' }}
                      style={{ width: 25, height: 25 }} />

                  </TouchableOpacity>

                </View>

              </Modal>
            )
            :
            null
        }
        <Image style={styles.mainImage} source={{ uri: HOME_URL + this.state.movieDetails.backdrop_path }} />