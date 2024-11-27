import React from 'react';
import { Box, Typography, Container, Grid, Paper, Link, Avatar } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PublicIcon from '@mui/icons-material/Public';

const safetyResources = [
    {
        title: "Childline 1098",
        description: "India’s first 24-hour, free emergency phone service for children in need of assistance. Kids can call 1098 to get immediate help for abuse, neglect, or any emergency.",
        services: "Rescue, emergency care, counseling, and referrals for shelter, healthcare, and rehabilitation.",
        contact: "1098",
        website: "https://www.childlineindia.org/",
        icon: <ChildCareIcon />
    },
    {
        title: "National Commission for Protection of Child Rights (NCPCR) Helpline",
        description: "Protects, promotes, and advocates for children's rights in India. The helpline can be used to report cases of child rights violations.",
        contact: "1800-121-2830",
        website: "https://ncpcr.gov.in/",
        icon: <SecurityIcon />
    },
    {
        title: "POSCO e-Box (Protection of Children from Sexual Offences)",
        description: "An online complaint box where children or their guardians can report incidents of sexual abuse confidentially.",
        website: "http://ncpcr.gov.in/index1.php?lang=1&level=0&linkid=19&lid=833",
        icon: <HelpOutlineIcon />
    },
    {
        title: "Ministry of Women and Child Development – Women and Child Helpline",
        description: "Provides assistance with abuse, exploitation, and welfare-related concerns for women and children, including support for rescue, counseling, and legal guidance.",
        contact: "181 (Women Helpline) or 1098 (Childline)",
        icon: <PhoneIcon />
    },
    {
        title: "Cyber Crime Reporting Portal",
        description: "Allows kids or their guardians to report incidents of cyberbullying, online abuse, and exploitation.",
        website: "https://cybercrime.gov.in/",
        icon: <PublicIcon />
    },
    {
        title: "iCALL – Tata Institute of Social Sciences (TISS)",
        description: "A mental health helpline offering free, anonymous counseling services over the phone and email for stress, anxiety, bullying, and other mental health issues.",
        contact: "9152987821",
        website: "https://icallhelpline.org/",
        icon: <PhoneIcon />
    },
    {
        title: "SNEHI",
        description: "Offers mental health support to children and adolescents, focusing on emotional and psychological well-being.",
        contact: "info@snehi.org",
        website: "http://snehi.org/",
        icon: <EmailIcon />
    },
    {
        title: "Sakshi Violence Intervention Centre",
        description: "Provides support and intervention in cases of abuse, with a focus on prevention and awareness for children and adolescents.",
        contact: "sakshiviolenceintervention@gmail.com",
        website: "https://www.sakshi.org.in/",
        icon: <EmailIcon />
    },
    {
        title: "UNICEF India",
        description: "Partners with organizations to promote child rights, education, and health in India.",
        website: "https://www.unicef.org/india/",
        icon: <LanguageIcon />
    }
];

const SafetyResources = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Typography variant="h4" color="primary" textAlign="center" sx={{ mb: 4, fontWeight: 'bold' }}>
                Kids Safety and Help Resources in India
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{ mb: 6, color: 'text.secondary' }}>
                These resources provide a safety net for children and their guardians, ensuring access to help whenever they need it.
            </Typography>
            <Grid container spacing={4}>
                {safetyResources.map((resource, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%', position: 'relative' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{resource.icon}</Avatar>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                                    {resource.title}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                {resource.description}
                            </Typography>
                            {resource.services && (
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontStyle: 'italic' }}>
                                    Services Provided: {resource.services}
                                </Typography>
                            )}
                            {resource.contact && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <PhoneIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="body2" color="textSecondary">
                                        {resource.contact}
                                    </Typography>
                                </Box>
                            )}
                            {resource.website && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <LanguageIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                                    <Link href={resource.website} target="_blank" rel="noopener" variant="body2" color="primary">
                                        Visit Website
                                    </Link>
                                </Box>
                            )}
                            {resource.contact && !resource.contact.startsWith('http') && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <EmailIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="body2" color="textSecondary">
                                        {resource.contact}
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default SafetyResources;
