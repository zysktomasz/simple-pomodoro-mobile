import React from 'react'
import { View, Text } from 'native-base'
import { StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


class CircularCountdown extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let timerMode = this.props.countdownState.countdownMode
        let formatedCountdownTime = new Date(this.props.countdownState.countdownTime * 1000).toISOString().substr(14, 5);  
        let maxTimerTime = (timerMode === "focus") ? this.props.countdownState.activityTime : this.props.countdownState.breakTime
        const fill = this.props.countdownState.countdownTime / maxTimerTime * 100;


        return (
            <View style={{alignItems: "center", top: 7}}>
                <AnimatedCircularProgress
                    size={150}
                    width={6}
                    fill={fill}
                    tintColor={this.props.countdownState.wheelColor}
                    backgroundColor="#C6CCCF"
                    lineCap="square"
                    onAnimationComplete={() => {
                        if(this.props.playClockTickSound && this.props.countdownState.countdownTime <= 5)
                            this.props.singleClockTickSound.play()
                    }}
                >
                    {() =>
                    <View>
                    <Text style={{top: -30}}>
                        {this.props.countdownState.isCountdownRunning ? timerMode : 'WAITING'}
                    </Text>
                    <Text style={styles.points}>
                        { formatedCountdownTime }
                    </Text>
                    </View>
                    }
                </AnimatedCircularProgress>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    points: {
      backgroundColor: 'transparent',
      position: 'absolute',
      alignSelf: "center",
      // top: 49,
      // left: 28,
      width: 90,
      textAlign: 'center',
      color: '#7591af',
      fontSize: 35,
      fontWeight: "100"
    }
  })

export default CircularCountdown