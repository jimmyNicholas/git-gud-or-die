import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { useMemo } from 'react';

export const HealthBar = ({
  deadline,
  createdAt,
  timeRemaining,
}: {
  deadline: string;
  createdAt: string;
  timeRemaining: string;
}) => {

  const healthBarData = useMemo(() => {
    const getHealthBarData = (
      createdAt: string,
      deadline: string
    ): { percentage: number; color: string } => {
      const creationDate = new Date(createdAt);
      const deadlineDate = new Date(deadline);
    
      const timeToDeadline = deadlineDate.getTime() - Date.now(); 
      const totalTime = deadlineDate.getTime() - creationDate.getTime();
      const percentage = (timeToDeadline / totalTime) * 100;
      
      const clampedPercentage = Math.max(0, Math.min(100, percentage));
      
      // Color progression based on urgency
      let color: string = theme.colors.success; // Green
      if (clampedPercentage <= 25) {
        color = theme.colors.error; // Red
      } else if (clampedPercentage <= 50) {
        color = theme.colors.secondaryLight; // Orange
      } else if (clampedPercentage <= 75) {
        color = theme.colors.warning; // Yellow
      }
      
      return { percentage: clampedPercentage, color };
    };

    return getHealthBarData(createdAt, deadline);
  }, [createdAt, timeRemaining, deadline]); // timeRemaining is not used here, but it is needed to trigger the re-render

  return (
    <View style={styles.healthBarContainer}>
      <View style={styles.healthBar}>
        <View
          style={[
            styles.healthBarFill,
            {
              width: `${healthBarData.percentage}%`,
              backgroundColor: healthBarData.color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  healthBarContainer: {
    marginTop: theme.spacing.xs,
  },
  healthBar: {
    height: 8,
    backgroundColor: theme.colors.textDark,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  healthBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});
