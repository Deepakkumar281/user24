
import { colors } from "./Colors";
import { deviceHeight, deviceWidth } from './Dimens';
import { Fonts } from './Fonts';

export const styling = {
  container: { flex: 1, backgroundColor: 'white', },
  texthead: {
    color: 'black',
    fontSize: deviceHeight(2.2),
    fontFamily: Fonts.ibmbold,
  },
  textsub: {
    color: colors.text,
    fontSize: deviceHeight(1.6),
    fontFamily: Fonts.ibmsemibold,
    lineHeight: 20,
    flex: 1,
  },
  textsub1: {
    color: colors.text,
    fontSize: deviceHeight(1.6),
    fontFamily: Fonts.ibmsemibold,
    lineHeight: 20,
  },
  textgreen: {
    color: '#1DA844',
    fontSize: deviceHeight(1.6),
    fontFamily: Fonts.ibmsemibold,
    lineHeight: 20,
  },
  textfield1: {
    color: 'black',
    fontSize: deviceHeight(1.8),
    fontFamily: Fonts.ibmsemibold,
  },
  textfield2: {
    color: colors.text,
    fontSize: deviceHeight(1.8),
    fontFamily: Fonts.ibmmedium,
  },
  field1: {
    backgroundColor: colors.field,
    borderRadius: 20,
    height: deviceHeight(7),
  },
  textblue: {
    color: '#0883FE',
    fontSize: deviceHeight(1.8),
    fontFamily: Fonts.ibmmedium,
  },
};
