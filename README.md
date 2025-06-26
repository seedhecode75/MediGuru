# MediGuru - Medical Chatbot 🩺

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://python.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-red.svg)](https://pytorch.org)
[![Flask](https://img.shields.io/badge/Flask-2.3.x-lightgrey.svg)](https://flask.palletsprojects.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)](https://reactjs.org)

MediGuru is an AI-powered medical chatbot that provides reliable medical information using prompt-tuned language models specialized for healthcare domain.

## MediGuru Demo

https://github.com/user-attachments/assets/4d112bbe-9f9e-446c-ac33-b3acb20fe076


*Click image to watch demo video*

## 🔍 Overview

MediGuru combines state-of-the-art NLP techniques with medical expertise to:
- Answer health-related questions
- Provide symptom analysis
- Offer medication information
- Suggest preliminary medical guidance
- Maintain conversation context

## ⚙️ Technologies Used

### 🤖 AI/ML Components
| Technology | Purpose | Version |
|------------|---------|---------|
| ![PyTorch](https://img.shields.io/badge/-PyTorch-red) | Deep Learning Framework | 2.0+ |
| ![HuggingFace](https://img.shields.io/badge/-HuggingFace-yellow) | Transformers Library | 4.30+ |
| ![PromptTuning](https://img.shields.io/badge/-Prompt_Tuning-blue) | Efficient Fine-tuning | Custom |
| ![scikit-learn](https://img.shields.io/badge/-scikit--learn-orange) | Data Processing | 1.2+ |

### 💻 Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| ![Flask](https://img.shields.io/badge/-Flask-lightgrey) | API Framework | 2.3.x |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-green) | Database | 6.0+ |
| ![Gunicorn](https://img.shields.io/badge/-Gunicorn-%23499848) | Production Server | 20.1+ |
| ![Redis](https://img.shields.io/badge/-Redis-red) | Caching | 7.0+ |

### 🌐 Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB) | UI Framework | 18.x |
| ![TailwindCSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC) | Styling | 3.3+ |
| ![Vite](https://img.shields.io/badge/-Vite-B73BFE) | Build Tool | 4.3+ |
| ![Redux](https://img.shields.io/badge/-Redux-764ABC) | State Management | 4.2+ |


### Key Features

- Prompt Tuning: Efficient adaptation of pre-trained models

- Medical Specialization: Trained on PubMed, MIMIC-III, and clinical notes

- Context Awareness: Maintains conversation history

- Safety Mechanisms: Hallucination reduction techniques


## 🧠 Model Architecture

```mermaid
graph LR
    A[User Input] --> B(Prompt Encoder)
    B --> C[Pre-trained LM]
    C --> D[Medical Knowledge Base]
    D --> E[Response Generation]

