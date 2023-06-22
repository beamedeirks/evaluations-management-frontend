import React from 'react';
import { FiEdit, FiHome, FiPieChart, FiUser } from 'react-icons/fi';
//import { HiOutlineDocumentReport } from 'react-icons/hi';
import { RiCustomerService2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const SidebarWrapper = styled.div`
  width: 3rem;
  background-color: #F6851C;
  opacity: 0.9;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  padding: 1rem 1rem 1rem 0;
  box-shadow: 0px 0px 5px #ccc;
  ul {
    list-style-type: none; /* Remover a configuração padrão da lista */
    padding: 0;
    margin: 0;
  }
`
const SidebarItemWrapper = styled.li`
  cursor: pointer;
  font-size:2rem;
  padding: 0 10px 20px 15px;
`;

const SidebarItem = ({ to, children, icon, color }) => {
  const IconComponent = icon; // Converte o ícone para um componente

  return (
    <SidebarItemWrapper>
      <Link to={to}>
        <IconComponent color={color} /> {/* Define a cor do ícone */}
        {children}
      </Link>
    </SidebarItemWrapper>
  );
};

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <ul>
        <SidebarItem to="/" icon={FiHome} color="white" />
        <SidebarItem to="/FormAttendances" icon={FiEdit} color="white" />
        <SidebarItem to="/AttendancesReport" icon={RiCustomerService2Line} color="white" />
        <SidebarItem to="/Dashboard" icon={FiPieChart} color="white" />
        <SidebarItem to="/UsersScreen" icon={FiUser} color="white" />
      </ul>
    </SidebarWrapper>
  );
};

export default Sidebar;
