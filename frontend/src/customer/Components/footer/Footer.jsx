import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#0f172a', color: '#94a3b8', mt: 8, pt: 8, pb: 4, borderTop: '1px solid #1e293b' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Brand & Mission */}
          <Grid item xs={12} sm={6} md={3}>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="ShopSphere" className="h-8 w-auto object-contain brightness-110" />
            </div>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.875rem' }}>
              Curated lifestyle and fashion collections engineered for modern, frictionless digital retail.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ color: '#f8fafc', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 2 }}>
              Shop Categories
            </Typography>
            <div className="flex flex-col space-y-2">
              {['Men Collection', 'Women Traditional', 'Footwear', 'Trending Deals'].map((item) => (
                <Button key={item} sx={{ p: 0, justifyContent: 'flex-start', color: '#94a3b8', '&:hover': { color: '#f97316' }, textTransform: 'none', fontSize: '0.875rem' }}>
                  {item}
                </Button>
              ))}
            </div>
          </Grid>

          {/* Customer Support */}
          <Grid item xs={6} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ color: '#f8fafc', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 2 }}>
              Customer Experience
            </Typography>
            <div className="flex flex-col space-y-2">
              {['Order Tracking', 'Shipping & Returns', 'Help Center', 'Payment Security'].map((item) => (
                <Button key={item} sx={{ p: 0, justifyContent: 'flex-start', color: '#94a3b8', '&:hover': { color: '#f97316' }, textTransform: 'none', fontSize: '0.875rem' }}>
                  {item}
                </Button>
              ))}
            </div>
          </Grid>

          {/* Legal */}
          <Grid item xs={6} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ color: '#f8fafc', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 2 }}>
              Company
            </Typography>
            <div className="flex flex-col space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Preferences', 'Store Locator'].map((item) => (
                <Button key={item} sx={{ p: 0, justifyContent: 'flex-start', color: '#94a3b8', '&:hover': { color: '#f97316' }, textTransform: 'none', fontSize: '0.875rem' }}>
                  {item}
                </Button>
              ))}
            </div>
          </Grid>
        </Grid>

        {/* Dynamic 2026 Copyright */}
        <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            &copy; {new Date().getFullYear()} <span style={{ color: '#f8fafc', fontWeight: 600 }}>ShopSphere Inc.</span> All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: '#475569', mt: 0.5, display: 'block' }}>
            Designed & Developed by <span style={{ color: '#f97316', fontWeight: 600 }}>Gaurav</span> • Built with MERN Architecture
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default Footer;
