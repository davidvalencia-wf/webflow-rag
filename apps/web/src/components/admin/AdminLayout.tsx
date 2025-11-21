/**
 * AdminLayout Component
 * Dashboard layout with sidebar navigation and header
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  BarChart3,
  Zap,
  Star,
  DollarSign,
  FileText,
  TrendingUp,
  Search,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
} from 'lucide-react';
import { WebflowMark } from '../WebflowLogo';
import { pagePath } from '@/lib/basePath';

type DashboardTab =
  | 'content-gaps'
  | 'overview'
  | 'performance'
  | 'quality'
  | 'cost'
  | 'content'
  | 'trends'
  | 'topic-trends'
  | 'sentiment';

interface AdminLayoutProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  children: React.ReactNode;
  onRefresh?: () => void;
  onExport?: () => void;
}

interface NavItem {
  id: DashboardTab;
  label: string;
  icon: React.ReactNode;
  group?: string;
}

const navItems: NavItem[] = [
  { id: 'content-gaps', label: 'Content Gaps', icon: <AlertTriangle size={20} />, group: 'main' },
  { id: 'overview', label: 'Overview', icon: <BarChart3 size={20} />, group: 'analytics' },
  { id: 'performance', label: 'Performance', icon: <Zap size={20} />, group: 'analytics' },
  { id: 'quality', label: 'Quality', icon: <Star size={20} />, group: 'analytics' },
  { id: 'cost', label: 'Cost', icon: <DollarSign size={20} />, group: 'analytics' },
  { id: 'content', label: 'Content', icon: <FileText size={20} />, group: 'analytics' },
  { id: 'trends', label: 'Trends', icon: <TrendingUp size={20} />, group: 'analytics' },
  { id: 'topic-trends', label: 'Topic Trends', icon: <Search size={20} /> },
  { id: 'sentiment', label: 'Sentiment', icon: <MessageSquare size={20} /> },
];

export function AdminLayout({
  activeTab,
  onTabChange,
  children,
  onRefresh,
  onExport,
}: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: '#171717',
        fontFamily: 'var(--font-inter)',
      }}
    >
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 h-full transition-all duration-300 z-50"
        style={{
          width: sidebarCollapsed ? '80px' : '280px',
          backgroundColor: '#1C1C1C',
          borderRight: '1px solid #363636',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-between p-6"
          style={{ borderBottom: '1px solid #363636' }}
        >
          <Link
            href={pagePath('/')}
            className="flex items-center hover:opacity-80 transition-opacity active-scale"
            aria-label="Return to home page"
          >
            <WebflowMark variant="white" size={sidebarCollapsed ? 28 : 36} />
          </Link>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="active-scale"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ABABAB',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 88px)' }}>
          {/* Content Gaps - Priority */}
          <div className="mb-6">
            {!sidebarCollapsed && (
              <p
                className="mb-2 px-3"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#898989',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                }}
              >
                Priority
              </p>
            )}
            {navItems
              .filter((item) => item.group === 'main')
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className="w-full transition-all active-scale hover:bg-opacity-10"
                  style={{
                    backgroundColor: activeTab === item.id ? '#146EF5' : 'transparent',
                    color: activeTab === item.id ? '#FFFFFF' : '#D8D8D8',
                    border: 'none',
                    borderRadius: '8px',
                    padding: sidebarCollapsed ? '12px' : '14px 16px',
                    marginBottom: '4px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontWeight: activeTab === item.id ? 600 : 500,
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  {!sidebarCollapsed && (
                    <span style={{ fontSize: '15px' }}>{item.label}</span>
                  )}
                </button>
              ))}
          </div>

          {/* Analytics Group */}
          <div className="mb-6">
            {!sidebarCollapsed && (
              <p
                className="mb-2 px-3"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#898989',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                }}
              >
                Analytics
              </p>
            )}
            {navItems
              .filter((item) => item.group === 'analytics')
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className="w-full transition-all active-scale hover:bg-opacity-10"
                  style={{
                    backgroundColor: activeTab === item.id ? '#146EF5' : 'transparent',
                    color: activeTab === item.id ? '#FFFFFF' : '#D8D8D8',
                    border: 'none',
                    borderRadius: '8px',
                    padding: sidebarCollapsed ? '12px' : '14px 16px',
                    marginBottom: '4px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontWeight: activeTab === item.id ? 600 : 500,
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  {!sidebarCollapsed && (
                    <span style={{ fontSize: '15px' }}>{item.label}</span>
                  )}
                </button>
              ))}
          </div>

          {/* Other */}
          <div>
            {!sidebarCollapsed && (
              <p
                className="mb-2 px-3"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#898989',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                }}
              >
                Insights
              </p>
            )}
            {navItems
              .filter((item) => !item.group)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className="w-full transition-all active-scale hover:bg-opacity-10"
                  style={{
                    backgroundColor: activeTab === item.id ? '#146EF5' : 'transparent',
                    color: activeTab === item.id ? '#FFFFFF' : '#D8D8D8',
                    border: 'none',
                    borderRadius: '8px',
                    padding: sidebarCollapsed ? '12px' : '14px 16px',
                    marginBottom: '4px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontWeight: activeTab === item.id ? 600 : 500,
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  {!sidebarCollapsed && (
                    <span style={{ fontSize: '15px' }}>{item.label}</span>
                  )}
                </button>
              ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className="transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? '80px' : '280px',
        }}
      >
        {/* Header */}
        <header
          className="sticky top-0 z-40"
          style={{
            backgroundColor: '#1C1C1C',
            borderBottom: '1px solid #363636',
            padding: '20px 32px',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '4px',
                }}
              >
                {navItems.find((item) => item.id === activeTab)?.label}
              </h2>
              <p style={{ fontSize: '14px', color: '#898989' }}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="active-scale hover:bg-opacity-90 transition-all"
                  style={{
                    backgroundColor: '#222222',
                    color: '#D8D8D8',
                    border: '1px solid #363636',
                    borderRadius: '8px',
                    padding: '12px 20px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '15px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <RefreshCw size={18} />
                  Refresh
                </button>
              )}
              {onExport && (
                <button
                  onClick={onExport}
                  className="active-scale hover:bg-opacity-90 transition-all"
                  style={{
                    backgroundColor: '#146EF5',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 20px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '15px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Download size={18} />
                  Export
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: '32px' }}>{children}</div>
      </main>
    </div>
  );
}
