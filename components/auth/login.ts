export const login = async (email: string, password: string) => {
  try {
    const API_URL = process.env.API_URL || 'http://localhost:5001';
    
    console.log('Login attempt for:', email);
    console.log('Using API URL:', API_URL);
    
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);

    // Parse the response
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data));

    // Handle error responses
    if (!response.ok) {
      console.log('Login failed with error:', data.error || 'Unknown error');
      return { 
        success: false, 
        error: data.error || 'Login failed',
        statusCode: response.status // Include the status code in the error response
      };
    }

    console.log('Login successful for user:', data.email);
    // Return successful response with user data
    return {
      success: true, // Indicate success
      id: data.id,
      email: data.email,
      name: data.name,
      token: data.token,
      statusCode: response.status // Include the status code in the success response
    };
  } catch (error) {
    console.error('Login error:', error);
    console.log('Error details:', JSON.stringify(error));
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Network error or server unavailable',
      statusCode: 500 // Indicate a server error
    };
  }
};
