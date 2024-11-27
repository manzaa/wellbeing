import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
// import About from './components/About';
// import Projects from './components/Projects';
// import ProjectDetails from './components/ProjectDetails';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import KidPowerHub from './pages/KidPowerHub';
import CookingChallenge from './components/CookingChallenge';
import Badges from './components/Badges';
import RoomRescue from './components/RoomRescue';
import BudgetBuddy from './components/BudgetBuddy';
import PlanADay from './components/PlanADay';
import MyFeelingsFriend from './components/MyFeelingsFriend';
import EcoExplorer from './components/EcoExplorer';
import Emergency101 from './components/Emergency101';
import DoodleJournal from './components/DoodleJournal';
import WeatherWatcher from './components/WeatherWatcher';
import HomeHelper from './components/HomeHelper';
import SafetyResources from './components/SafetyResources';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import VirtualLab from './components/VirtualLab';
import AdventureMap from './components/AdventureMap';
import Location from './components/Location';
import WellbeingSpinner from './components/WellbeingSpinner';
import ParentRespectGame from './components/ParentRespectGame';
import MindfulnessGratitudeBoardGame from './components/MindfulnessGratitudeBoardGame';
import WellbeingChatBot from './components/WellbeingChatBot';
import WorldMapSpotting from './components/WorldMapSpotting';
import WorksheetGenerator from './components/WorksheetGenerator';
import PhonicsWorksheetGenerator from './components/PhonicsWorksheetGenerator';
import GoodVsBadGame from './components/GoodVsBadGame';
import DailyRoutine from './components/DailyRoutine';
import HealthyReminders from './components/HealthyReminders';
import NatureHealth from './components/NatureHealth';
import MoralStories from './components/MoralStories';
import BuildALunchbox from './components/BuildALunchbox';
import KidPresentation from './components/KidPresentation';
import SavingsJarGame from './components/SavingsJarGame';
import ContactUs from './components/ContactUs';
import StoryBook from './components/StoryBook';
import Goodtoknow from './components/Goodtoknow';
import TeenPowerHub from './components/TeenPowerHub';
import VideoGallery from './components/VideoGallery';
import Sudoku from './components/Sudoku';
import YogaCharacter from './components/YogaCharacter';
import StressReliefGames from './components/StressReliefGames';
import GameBoard from './components/GameBoard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import OutOfTheBoxGame from './components/OutOfTheBoxGame';
import KnowledgeBlog from './components/KnowledgeBlog';
import PremiumWellbeingChatBot from './components/PremiumWellbeingChatBot';
import Subscribe from './components/Subscribe';
import MagicWellbeing from './components/MagicWellbeing';
import WellbeingQuizzes from './components/WellbeingQuizzes';
import TrademarkFooter from './components/TrademarkFooter';

function App() {
    const location = useLocation();

    // Define paths where Navbar should not appear
    const noNavbarRoutes = ['/', '/signup'];
console.log(noNavbarRoutes.includes(location.pathname));
    return (
        <>
            <AuthProvider>
            {/* Render Navbar unless the current route matches noNavbarRoutes */}
            {noNavbarRoutes.includes(location.pathname) === false && <Navbar />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route element={<PrivateRoute />}>
                <Route path="/wellbeing" element={<GameBoard />} />
                <Route path="/stress" element={<StressReliefGames />} />
                <Route path="/anxiety" element={<YogaCharacter />} />
                <Route path="/sudoku" element={<Sudoku />} />
                <Route path="/savingsjargame" element={<SavingsJarGame />} />
                <Route path="/buildlunchbox" element={<BuildALunchbox />} />
                <Route path="/presentation" element={<KidPresentation />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/kidpowerhub" element={<KidPowerHub />} />
                <Route path="/cooking-challenge" element={<CookingChallenge />} />
                <Route path="/badges" element={<Badges userId={1} />} /> {/* Replace 1 with dynamic user ID if needed */}
                <Route path="/roomrescue" element={<RoomRescue />} />
                <Route path="/budgetbuddy" element={<BudgetBuddy />} />
                <Route path="/planAday" element={<PlanADay />} />
                <Route path="/myfeelingsfriend" element={<MyFeelingsFriend />} />
                <Route path="/ecoexplorer" element={<EcoExplorer />} />
                <Route path="/emergency101" element={<Emergency101 />} />
                <Route path="/doodlejournal" element={<DoodleJournal />} />
                <Route path="/weatherwatcher" element={<WeatherWatcher />} />
                <Route path="/homehelper" element={<HomeHelper />} />
                <Route path="/safetyresources" element={<SafetyResources />} />
                <Route path="/virtuallab" element={<VirtualLab />} />
                <Route path="/adventuremap" element={<AdventureMap />} />
                <Route path="/location/:id" element={<Location />} />
                <Route path="/wellbeingspinner" element={<WellbeingSpinner />} />
                <Route path="/parentrespectgame" element={<ParentRespectGame />} />
                <Route path="/mindfulness" element={<MindfulnessGratitudeBoardGame />} />
                <Route path="/wellbeingchatbot" element={<WellbeingChatBot />} />
                <Route path="/worldmapspotting" element={<WorldMapSpotting />} />
                <Route path="/worksheets" element={<WorksheetGenerator />} />
                <Route path="/phonics" element={<PhonicsWorksheetGenerator />} />
                <Route path="/goodvsbad" element={<GoodVsBadGame />} />
                <Route path="/routine" element={<DailyRoutine />} />
                <Route path="/reminders" element={<HealthyReminders />} />
                <Route path="/naturehealth" element={<NatureHealth />} />
                <Route path="/moralstories" element={<MoralStories />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/storybook" element={<StoryBook />} />
                <Route path="/goodtoknow" element={<Goodtoknow />} />
                <Route path="/premium" element={<TeenPowerHub />} />
                <Route path="/insights" element={<VideoGallery />} />
                <Route path="/think-out-of-the-box" element={<OutOfTheBoxGame />} />
                <Route path="/kids-knowledge-base" element={<KnowledgeBlog />} />
                <Route path="/premium-wellbeing-chatbot" element={<PremiumWellbeingChatBot />} />
                <Route path="/subscribe" element={<Subscribe />} />
                <Route path="/magics" element={<MagicWellbeing />} />
                <Route path="/wellbeingquiz" element={<WellbeingQuizzes />} />
                </Route>
                {/* <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project-details" element={<ProjectDetails />} /> */}
            </Routes>
            {noNavbarRoutes.includes(location.pathname) === false && <TrademarkFooter />}
            </AuthProvider>
            </>
    );
}

// Wrap App with Router
const AppWithRouter = () => (
    <Router>
        <App />
    </Router>
);

export default AppWithRouter;
