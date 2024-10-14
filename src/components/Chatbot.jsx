import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const questionAnswers = [
    {
        question: "1",
        answer: "NALCO Finance is a financial service division of National Aluminium Company Limited (NALCO), providing various financial products and services to its customers, including loans, investment options, and financial advice."
    },
    {
        question: "2",
        answer: "We offer a variety of loans, including personal loans, home loans, car loans, education loans, and business loans. Each loan product is designed to meet the specific needs of our customers."
    },
    {
        question: "3",
        answer: "You can apply for a loan by visiting our website and filling out the online application form. Alternatively, you can visit any of our branches or contact our customer service for assistance."
    },
    {
        question: "4",
        answer: "The required documents may vary depending on the type of loan. Generally, you will need proof of identity, proof of address, income proof, bank statements, and any other relevant documents specific to the loan type."
    },
    {
        question: "5",
        answer: "Our interest rates vary depending on the type of loan, loan amount, and tenure. Please visit our website or contact our customer service for the latest interest rates and offers."
    },
    {
        question: "6",
        answer: "You can check your loan status by logging into your account on our website or by contacting our customer service with your loan application number."
    },
    {
        question: "7",
        answer: "We offer a range of investment options, including fixed deposits, mutual funds, savings accounts, and more. Our financial advisors can help you choose the best investment plan based on your financial goals."
    },
    {
        question: "8",
        answer: "To open a fixed deposit account, you can apply online through our website or visit any of our branches. You will need to provide necessary documents and choose the deposit tenure and amount."
    },
    {
        question: "9",
        answer: "The minimum balance requirement for a savings account varies. Please refer to our website or contact our customer service for detailed information on account requirements."
    },
    {
        question: "10",
        answer: "You can contact our customer service by calling our helpline number, emailing us, or using the live chat feature on our website. We are here to assist you with any queries or issues."
    },
    {
        question: "11",
        answer: "Loan repayments can be made through online banking, mobile banking, automatic debit from your account, or by visiting our branches. Detailed instructions and options will be provided during the loan approval process."
    },
    {
        question: "12",
        answer: 'Yes, you can prepay your loan. Prepayment charges may apply depending on the type of loan and the terms and conditions. Please refer to your loan agreement or contact our customer service for more information.'
    },
    {
        question: "13",
        answer: "You can update your contact information by logging into your account on our website or by visiting any of our branches. You may need to provide proof of the new information."
    },
    {
        question: "14",
        answer: "Our branch working hours are from 9:00 AM to 5:00 PM, Monday to Friday. Some branches may also be open on Saturdays from 10:00 AM to 2:00 PM. Please check our website for specific branch timings."
    },
    {
        question: "15",
        answer: "Yes, we offer comprehensive online banking services, including account management, fund transfers, bill payments, and more. You can access these services by logging into your account on our website or through our mobile banking app."
    }
]

export default function App() {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hi, how can I help you?",
            sender: "bot",
            direction: "incoming",
        },
        {
            message: "Choose an option from the below questions: ",
            sender: "bot",
            direction: "incoming"
        },
        {
            message: "1. What is NALCO Finance? \n2. What types of loans do you offer? \n3. How can I apply for a loan? \n4. What documents are required for loan application? \n5. What are the interest rates for your loans? \n6. How can I check my loan status? \n7. What investment options do you provide? \n8. How can I open a fixed deposit account? \n9. What is the minimum balance requirement for a savings account? \n10. How can I contact customer service? \n11. What is the process for loan repayment? \n12. Can I prepay my loan? Are there any charges? \n13. How do I update my contact information? \n14. What are your branch working hours? \n15. Do you offer online banking services?",
            sender: "bot",
            direction: "incoming"
        }

    ]);

    const handleSend = async (message) => {

        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        // setMessages([...messages, newMessage]);
        setMessages((prevMessages) => [...prevMessages, newMessage])

        setTyping(true)

        await new Promise(resolve => setTimeout(resolve, 1500));

        processMessage(message)

        setTyping(false)

    };

    const processMessage = (message) => {
        let foundAnswer = false;

        questionAnswers.forEach((question) => {
            if (question.question === message.toLowerCase()) {
                const botMessage = {
                    message: question.answer,
                    direction: 'incoming',
                    sender: 'bot'
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
                foundAnswer = true;
            }
        });

        if (!foundAnswer) {
            const botMessage = {
                message: 'No answer to this question found!',
                direction: 'incoming',
                sender: 'bot'
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    }

    return (
        <div className="App" style={{ width: "100%" }}>
            <div style={{ position: "relative", height: "100vh", width: "100%" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={typing ? <TypingIndicator content=" Fetching answers..." /> : null}
                        >
                            {messages.map((message, i) => {
                                return <Message style={{ maxWidth: "50%" }} key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}
