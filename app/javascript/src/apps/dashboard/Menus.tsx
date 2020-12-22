import {
  AccountBookOutlined,
  CommentOutlined,
  DashboardOutlined,
  FileTextOutlined,
  LoginOutlined,
  MenuOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { imagePath, useUserAgent } from '@shared';
import { Avatar, Button, Drawer, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Menus(props: { activeMenu?: string }) {
  const { activeMenu } = props;
  const { isMobile } = useUserAgent();
  const { t } = useTranslation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const MenuConent = () => (
    <div>
      <div style={{ margin: 15, textAlign: 'center' }}>
        <Link to='/' replace>
          <Avatar size='large' src={imagePath('logo.svg')} />
        </Link>
      </div>
      <Menu mode='inline' selectedKeys={[activeMenu]}>
        <Menu.Item key='overview'>
          <Link to='/'>
            <DashboardOutlined />
            <span>{t('dashboard.menu.overview')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='articles'>
          <Link to='/articles'>
            <FileTextOutlined />
            <span>{t('dashboard.menu.articles')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='revenue'>
          <Link to='/revenue'>
            <RiseOutlined />
            <span>{t('dashboard.menu.revenue')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='orders'>
          <Link to='/orders'>
            <AccountBookOutlined />
            <span>{t('dashboard.menu.orders')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='comments'>
          <Link to='/commments'>
            <CommentOutlined />
            <span>{t('dashboard.menu.comments')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='back'>
          <a href='/'>
            <LoginOutlined />
            <span>{t('dashboard.menu.back')}</span>
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );
  return (
    <div>
      {isMobile.phone ? (
        <div>
          <Drawer
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
            closable={false}
            onClose={() => setDrawerVisible(false)}
            placement='right'
          >
            <MenuConent />
          </Drawer>
          <div
            style={{
              position: 'fixed',
              right: '0px',
              bottom: '100px',
              zIndex: 11,
            }}
          >
            <Button
              type='primary'
              size='large'
              onClick={() => setDrawerVisible(true)}
              icon={<MenuOutlined />}
            />
          </div>
        </div>
      ) : (
        <Layout.Sider
          theme='light'
          style={{ height: '100%', position: 'fixed', overflowY: 'scroll' }}
        >
          <MenuConent />
        </Layout.Sider>
      )}
    </div>
  );
}
