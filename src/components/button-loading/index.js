import React from 'react';
import PropTypes from 'prop-types';
import { Animated, View } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';

const CircularProgress = ({
  style,
  size,
  fill,
  width,
  backgroundWidth,
  tintColor,
  tintTransparency,
  backgroundColor,
  rotation,
  lineCap,
  arcSweepAngle,
  children,
  childrenContainerStyle,
  padding,
  renderCap,
  dashedBackground,
  dashedTint
}) => {
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  const circlePath = (x, y, radius, startAngle, endAngle) => {
    var start = polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
    return d.join(' ');
  }

  const clampFill = fill => Math.min(100, Math.max(0, fill));

  const currentFillAngle = (arcSweepAngle * clampFill(fill)) / 100;
  const radius = size / 2 - Math.max(width, backgroundWidth) / 2 - padding / 2;
  const sizeWithPadding = size / 2 + padding / 2;
  const coordinate = polarToCartesian(sizeWithPadding, sizeWithPadding, radius, currentFillAngle);

  const offset = size - Math.max(backgroundWidth, width) * 2;

  const localChildrenContainerStyle = {
    ...{
      position: 'absolute',
      left: Math.max(backgroundWidth, width) + padding / 2,
      top: Math.max(backgroundWidth, width) + padding / 2,
      width: offset,
      height: offset,
      borderRadius: offset / 2,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    ...childrenContainerStyle,
  }

  const strokeDasharrayTint = dashedTint.gap > 0 ?
    Object.values(dashedTint)
    .map(value => parseInt(value))
    : null;

  const strokeDasharrayBackground = dashedBackground.gap > 0 ?
    Object.values(dashedBackground)
    .map(value => parseInt(value))
    : null;

  return (
    <View style={style}>
      <Svg width={size + padding} height={size + padding}>
        <G rotation={rotation} originX={(size + padding) / 2} originY={(size + padding) / 2}>
          {backgroundColor && (
            <Path
              d={circlePath(sizeWithPadding, sizeWithPadding, radius, tintTransparency ? 0 : currentFillAngle, arcSweepAngle)}
              stroke={backgroundColor}
              strokeWidth={backgroundWidth || width}
              strokeLinecap={lineCap}
              strokeDasharray={strokeDasharrayBackground}
              fill="transparent"
            />
          )}
          {fill > 0 && (
            <Path
              d={circlePath(sizeWithPadding, sizeWithPadding, radius, 0, currentFillAngle)}
              stroke={tintColor}
              strokeWidth={width}
              strokeLinecap={lineCap}
              strokeDasharray={strokeDasharrayTint}
              fill="transparent"
            />
          )}
          {renderCap ? renderCap({ center: coordinate }) : null}
        </G>
      </Svg>
      {children && <View style={localChildrenContainerStyle}>{children(fill)}</View>}
    </View>
  );
}

CircularProgress.propTypes = {
  style: PropTypes.object,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Animated.Value),
  ]).isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  tintTransparency: PropTypes.bool,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  children: PropTypes.func,
  childrenContainerStyle: PropTypes.object,
  padding: PropTypes.number,
  renderCap: PropTypes.func,
  dashedBackground: PropTypes.object,
  dashedTint: PropTypes.object
};

CircularProgress.defaultProps = {
  tintColor: 'black',
  tintTransparency: true,
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360,
  padding: 0,
  dashedBackground: { width: 0, gap: 0 },
  dashedTint: { width: 0, gap: 0 },
};

export default CircularProgress;
