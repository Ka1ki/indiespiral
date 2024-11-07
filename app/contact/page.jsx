/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-4 bg-base-200">
      <div className="py-8 hero bg-base-100 sm:py-12">
        <div className="text-center hero-content">
          <div className="max-w-md px-4">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Contact Us
            </h1>
            <p className="py-4 text-sm sm:py-6 sm:text-base">
              We'd love to hear from you. Reach out for any questions, concerns,
              or just to say hello!
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 mx-auto sm:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="shadow-xl card bg-base-100">
              <div className="p-6 card-body sm:p-8">
                <h2 className="mb-2 text-xl card-title sm:text-2xl sm:mb-4">
                  About Us
                </h2>
                <p className="text-sm sm:text-base">
                  {process.env.ORG_NAME} is a leading provider of innovative
                  solutions. We're committed to excellence and customer
                  satisfaction in everything we do.
                </p>
              </div>
            </div>

            <div className="shadow-xl card bg-base-100">
              <div className="p-6 card-body sm:p-8">
                <h2 className="mb-2 text-xl card-title sm:text-2xl sm:mb-4">
                  Contact Information
                </h2>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li className="flex items-center">
                    <MapPin className="flex-shrink-0 mr-2" size={18} />
                    <span>123 Main St, Anytown, ST 12345</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="flex-shrink-0 mr-2" size={18} />
                    <span>(555) 123-4567</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="flex-shrink-0 mr-2" size={18} />
                    <span className="break-all">
                      info@inmylookingglasses.com
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="shadow-xl card bg-base-100">
              <div className="p-6 card-body sm:p-8">
                <h2 className="mb-2 text-xl card-title sm:text-2xl sm:mb-4">
                  Follow Us
                </h2>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#"
                    className="btn btn-primary btn-circle btn-outline"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="btn btn-primary btn-circle btn-outline"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="btn btn-primary btn-circle btn-outline"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="btn btn-primary btn-circle btn-outline"
                  >
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="shadow-xl card bg-base-100">
            <div className="p-6 card-body sm:p-8">
              <h2 className="mb-2 text-xl card-title sm:text-2xl sm:mb-4">
                Send Us a Message
              </h2>
              <form>
                <div className="form-control">
                  <label className="label" htmlFor="name">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="w-full input input-bordered"
                  />
                </div>
                <div className="mt-4 form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email"
                    className="w-full input input-bordered"
                  />
                </div>
                <div className="mt-4 form-control">
                  <label className="label" htmlFor="message">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your message"
                    className="w-full h-24 textarea textarea-bordered"
                  ></textarea>
                </div>
                <div className="mt-6 form-control">
                  <button
                    type="submit"
                    className="w-full btn btn-primary sm:w-auto"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
