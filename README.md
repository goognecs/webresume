# Cloud Resume Page
This repo contains updates of my code of a sample cloud resume.
## Description
Deploy an application with GitHub Actions and Amazon S3.
## Task: 
1. Create Amazon S3 and configure the bucket for the purpose of hosting a static website with public access. 
2. Create GitHub repo with simple personal website. 
3. Deploy an application with GitHub Actions and Amazon S3. 

## Step-by-Step Guide

## **Section 1**
### 1. __Create an S3 Bucket__
* Head to [AWS S3](https://console.aws.amazon.com/s3) Console → Create bucket 
* Name it exactly my domain name (iamnecs.com)
![image](https://github.com/goognecs/webresume/blob/main/images/S3_bucket.PNG)

* Enable Static Website Hosting (under "Properties")

* Select "Host a static website"
![image](https://github.com/goognecs/webresume/blob/main/images/static_website.PNG)
* Set index.html as the Index Document

### 2. __Make the Bucket Public__

* Go to Permissions → Bucket Policy

* Add this policy (replace yourdomain.com with your bucket name)
![image](https://github.com/goognecs/webresume/blob/main/images/S3_bucket_policy.PNG)

### 3. __Create Domain Name__
This can either be bough on NameCheap.com or AWS;
In my own case, I already have one on [www.namecheap.com]()
### 4. Request an SSL Certificate in AWS ACM__

* Go to AWS Certificate Manager (ACM) → Request a public certificate.

* Enter your domain (iamnecs.com and *.iamnecs.com for wildcard).

* Validate via DNS (Route 53 can auto-validate).
![SSL Certificate](https://github.com/goognecs/webresume/blob/main/images/acm1.PNG)

### 5. __Transfer DNS to AWS Route 53__
The requirement is to have DNS records in AWS, you need to delegate DNS from Namecheap to AWS Route 53:
#### 1. Create a Hosted Zone in Route 53

   * Go to AWS Route 53 → Hosted Zones → Create Hosted Zone

   * Enter your domain (iamnecs.com)
   * Copy the generated NS (Name Server) records (e.g., ns-xxx.awsdns-xx.com).
![NS](https://github.com/goognecs/webresume/blob/main/images/hosted_zone.PNG)
#### 2. Update Namecheap’s Nameservers to AWS

   * Log in to Namecheap → Domain List → Select your domain

   * Under Nameservers, choose Custom DNS

   * Enter the 4 AWS nameservers from your Route 53 Hosted Zone.

   * Save changes (DNS propagation may take up to 48 hours).
![NS Records](https://github.com/goognecs/webresume/blob/main/images/NS%20Record.PNG)

### 6. Configure A/DNS Records in Route 53
It's time to set up the A record to point to the S3 bucket:
#### 1. Go to Route 53 → Hosted Zones → Select your domain and Create a Record:

  * Record Name: [_resume_]() (for resume.iamnecs.com).
  * Record Type: A (IPv4).
  * Alias: Yes → Alias to S3 website endpoint.
  * Select the correct S3 endpoint (e.g., s3-website-us-east-1.amazonaws.com)

![S3 Endpoint](https://github.com/goognecs/webresume/blob/main/images/a_record.PNG)

#### 2. Update Namecheap DNS (Using CNAME):
Since Namecheap doesn’t support ALIAS records for root domains, you must use a subdomain ( resume.iamnecs.com).

1. Go to Namecheap DNS Settings
   * Log in → Domain List → Select your domain → Manage → Advanced DNS.

2. Add a CNAME Record
   * Type: CNAME
   * Host: blog (for blog.yourdomain.com)
   * Value: Your CloudFront domain (e.g., d123.cloudfront.net)
![CNAME](https://github.com/goognecs/webresume/blob/main/images/cname.PNG)

### 7. Create a CloudFront Distribution
1. Origin Domain: Select your S3 static website endpoint (resume.iamnecs.com.s3-website-us-east-1.amazonaws.com) 
![Cloudfront](https://github.com/goognecs/webresume/blob/main/images/cloud_front.PNG)

2. Viewer Protocol Policy: Redirect HTTP to HTTPS.
3. Alternate Domain Names (CNAMEs): Add your subdomain (resume.iamnecs.com)
4. SSL Certificate:
   * Select the SSL certificate we created on Amazon Certificate Manager for resume.iamnecs.com ![CF_SSL](https://github.com/goognecs/webresume/blob/main/images/cloudfront_ssl.PNG)

## **Section 2**
### Create GitHub repo with simple personal website.
1. Head to www.github.com and create a repository

```git
echo "# Deploy an application with GitHub Actions and Amazon S3" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/goognecs/webresume.git
git push -u origin main
```
2. Push/Upload Source-Code into Repo
```git
git add styles.css
git add index.html
git add script.js
git commit -m "source code"
git push -u origin main
```

## **Section 3**
### Deploy web-page with GitHub Actions into Amazon S3.
#### 1. Configure AWS IAM Permissions
  * Go to IAM → Users → Add User
  * Name: github-actions-s3-deploy
  * Access Type: Programmatic access (for AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY)
Attach S3 Permissions Policy

  * Attach the following inline policy (replace your-bucket-name):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}```

The website's HTML, JS, and CSS files are stored in an S3 bucket. The website is deployed using CloudFront for content distribution and is accessed securely via HTTPS. Route 53 and ACM are used to redirect traffic to the specified domain and manage SSL certificates.

## Services used
S3

Route 53

ACM

CloudFront

Dynamo DB