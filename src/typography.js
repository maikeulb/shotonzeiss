import Typography from 'typography';
import lawton from 'typography-theme-lawton';

const typography = new Typography(lawton);

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography;
