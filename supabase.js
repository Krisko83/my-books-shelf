// import 'react-native-url-polyfill/auto';

// import { createClient } from '@supabase/supabase-js';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const supabaseUrl = 'YOUR_SUPABASE_URL';
// const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

// export const supabase = createClient(supabaseUrl, supabaseKey, {
//     auth: {
//         storage: AsyncStorage,
//         autoRefreshToken: true,
//         persistSession: true,
//         detectSessionInUrl: false
//     }
// });


// Authentication	supabase.auth
// Read books	.from('books').select()
// Add books	.from('books').insert()
// Update books	.from('books').update()
// Delete books	.from('books').delete()
// Upload images	.storage.from('book-covers').upload()