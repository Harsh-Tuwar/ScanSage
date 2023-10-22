import { View, Text } from 'react-native'
import React from 'react'
import { general } from '../../styles';

const RecentScans = () => {
  return (
	<View style={{ ...general.center }}>
	  <Text style={general.font2}>Recent Scan scans</Text>
	</View>
  )
}

export default RecentScans;
