import './App.css';
import Header from './Header/Header.js'
import DataGridContainer from './Body/DataGridContainer'
import Histograms from './Body/Histograms'
import TimeSeries from './Body/TimeSeries'
import Scatterplots from './Body/ScatterPlots'
import DescriptiveStatistics from './Body/DescriptiveStatistics'
import CorrelationMatrix from './Body/CorrelationMatrix'
import LinearModel from './Body/LinearModel'

function App() {
  return (
    <div className="App">
      <Header/>
      <DataGridContainer/>
      <Histograms/>
      <TimeSeries/>
      <Scatterplots/>
      <DescriptiveStatistics/>
      <CorrelationMatrix/>
      <LinearModel/>
    </div>
  );
}

export default App;
