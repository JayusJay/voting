import './App.css';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import DrizzleOptions from './drizzleOptions';
import PollForm from './components/PollForm';

const drizzle = new Drizzle(DrizzleOptions);


function App() {
  return (
    <div className="App">
      <header className="App-header"/>

        <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {drizzleContext => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Loading..."
            }

            return (
              <PollForm drizzle={drizzle} drizzleState={drizzleState} />
            )
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    </div>
  );
}

export default App;
