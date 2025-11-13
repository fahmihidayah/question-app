'use client';

import Link from 'next/link';
import { MessageCircle, Users, Zap, ArrowRight, Play } from 'lucide-react';
import Navbar from '../Navbar';

interface LandingPageProps {
  isAuthenticated?: boolean;
  userName?: string;
}

const LandingPage = ({ isAuthenticated = false, userName }: LandingPageProps) => {
  return (

    <>
      <Navbar isAuthenticated={isAuthenticated} userName={userName} />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">
              <MessageCircle className="h-16 w-16 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Platform Tanya Jawab
            <span className="text-blue-600 dark:text-blue-400"> Konferensi</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Ajukan pertanyaan kepada pembicara dengan mudah. Buat konferensi interaktif
            yang memungkinkan audiens berpartisipasi aktif dalam diskusi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/auth"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-lg"
                >
                  Mulai Sekarang
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/conferences"
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Lihat Demo
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/conferences/create"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-lg"
                >
                  Buat Konferensi Baru
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/conferences"
                  className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  Lihat Konferensi Anda
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-400">Konferensi Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5K+</div>
              <div className="text-gray-600 dark:text-gray-400">Pertanyaan Diajukan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">Kepuasan Pengguna</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mengapa Memilih KonfQ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Platform yang dirancang khusus untuk meningkatkan interaksi dalam konferensi Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Mudah Digunakan</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Interface yang intuitif memungkinkan siapa saja dapat dengan mudah mengajukan
                pertanyaan tanpa registrasi yang rumit.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Partisipasi Tinggi</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Tingkatkan engagement audiens dengan sistem tanya jawab yang interaktif
                dan real-time untuk setiap konferensi.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Setup Cepat</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Buat konferensi baru hanya dalam hitungan menit. Bagikan link dan
                mulai terima pertanyaan dari audiens Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cara Kerja Platform
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tiga langkah sederhana untuk konferensi interaktif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="bg-blue-600 dark:bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Buat Konferensi</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Daftar dan buat konferensi baru dengan judul dan deskripsi yang menarik.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="bg-green-600 dark:bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Bagikan Link</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bagikan link konferensi kepada audiens melalui media sosial atau platform lain.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="bg-purple-600 dark:bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Terima Pertanyaan</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Audiens dapat langsung mengajukan pertanyaan yang akan ditampilkan secara real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Meningkatkan Konferensi Anda?
          </h2>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 leading-relaxed">
            Bergabunglah dengan ratusan penyelenggara konferensi yang sudah merasakan
            manfaat platform interaktif kami.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={isAuthenticated ? "/conferences/create" : "/auth"}
              className="bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 hover:bg-gray-100 dark:hover:bg-gray-200 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              {isAuthenticated ? "Buat Konferensi Sekarang" : "Mulai Gratis"}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-8 w-8 text-blue-400 dark:text-blue-500" />
                <span className="ml-2 text-xl font-bold">KonfQ</span>
              </div>
              <p className="text-gray-400 dark:text-gray-500 leading-relaxed max-w-md">
                Platform tanya jawab konferensi yang memungkinkan interaksi real-time
                antara pembicara dan audiens untuk pengalaman yang lebih engaging.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li><Link href="/conferences" className="hover:text-white transition-colors">Konferensi</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Masuk</Link></li>
                <li><Link href="/sign-up" className="hover:text-white transition-colors">Daftar</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Bantuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>&copy; 2024 KonfQ. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;