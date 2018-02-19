import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import context from 'jest-context';

Enzyme.configure({ adapter: new Adapter() });

global.context = context;
