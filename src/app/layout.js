"use client";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Emma Nasseri</title>
        <meta name="description" content="Spencer Attestation Experiment" />
        {/* Include any global styles here */}
      </head>

      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
