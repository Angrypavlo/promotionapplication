import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatisticsScreen = ({ route, navigation }) => {
    // Dummy statistics data
    const statisticsData = {
        totalFriends: 50,
        totalPosts: 100,
        totalLikes: 500,
        // Add more statistics data as needed
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Statistics</Text>
            <View style={styles.statContainer}>
                <Text style={styles.statLabel}>Total Friends:</Text>
                <Text style={styles.statValue}>{statisticsData.totalFriends}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.statLabel}>Total Runs:</Text>
                <Text style={styles.statValue}>{statisticsData.totalPosts}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.statLabel}>Average speed:</Text>
                <Text style={styles.statValue}>{statisticsData.totalLikes}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.statLabel}>Total coins Collected:</Text>
                <Text style={styles.statValue}>{statisticsData.totalLikes}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.statLabel}>Total time run:</Text>
                <Text style={styles.statValue}>{statisticsData.totalLikes}</Text>
            </View>
            {/* Add more statistics as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    statLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statValue: {
        fontSize: 18,
    },
});

export default StatisticsScreen;
