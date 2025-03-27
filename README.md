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

(![SSL Certificate](https://github.com/goognecs/webresume/blob/main/images/acm1.PNG))
### 5. __Transfer DNS to AWS Route 53__
The requirement is to have DNS records in AWS, you need to delegate DNS from Namecheap to AWS Route 53:
#### 1. Create a Hosted Zone in Route 53

   * Go to AWS Route 53 → Hosted Zones → Create Hosted Zone

   * Enter your domain (iamnecs.com)
   * Copy the generated NS (Name Server) records (e.g., ns-xxx.awsdns-xx.com).

#### 2. Update Namecheap’s Nameservers to AWS

   * Log in to Namecheap → Domain List → Select your domain

   * Under Nameservers, choose Custom DNS

   * Enter the 4 AWS nameservers from your Route 53 Hosted Zone.

   * Save changes (DNS propagation may take up to 48 hours).
![SSL]()

### 6. Configure A/DNS Records in Route 53
It's time to set up the A record to point to the S3 bucket:
#### 1. Go to Route 53 → Hosted Zones → Select your domain and Create a Record:

  * Record Name: [_resume_]() (for resume.iamnecs.com).

  * Record Type: A (IPv4).

  * Alias: Yes → Alias to S3 website endpoint.

  * Select the correct S3 endpoint (e.g., s3-website-us-east-1.amazonaws.com) 
![SSL]()

### 7. Create a CloudFront Distribution

1. Origin Domain: Select your S3 static website endpoint (resume.iamnecs.com.s3-website-us-east-1.amazonaws.com) ![SSL]()

2. Viewer Protocol Policy: Redirect HTTP to HTTPS.

3. SSL Certificate:

   * Select the SSL certificate we created on Amazon Certificate Manager for resume.iamnecs.com ![SSL]()

## **Section 2**
### Create GitHub repo with simple personal website.
1. Head to www.github.com

## **Section 3**
3. Deploy an application with GitHub Actions and Amazon S3.

The website's HTML, JS, and CSS files are stored in an S3 bucket. The website is deployed using CloudFront for content distribution and is accessed securely via HTTPS. Route 53 and ACM are used to redirect traffic to the specified domain and manage SSL certificates.

## Services used
S3
Route 53
ACM
CloudFront
Dynamo DB