import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEnquiryForm,
  clampSliderPercentage,
  getMaxCarouselIndex,
  stepCarouselIndex,
  formatINR,
  getPageMetadata,
} from './gymLogic';

test('validateEnquiryForm rejects empty inputs and invalid Indian phone numbers', () => {
  const emptyResult = validateEnquiryForm({
    name: '',
    phone: '',
    program: '',
    branch: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.program);
  assert.ok(emptyResult.errors.branch);

  const badPhone = validateEnquiryForm({
    name: 'Rohan Sharma',
    phone: '12345',
    program: 'Barbell Strength',
    branch: 'Bengaluru — Indiranagar',
  });
  assert.equal(badPhone.valid, false);
  assert.ok(badPhone.errors.phone);
});

test('validateEnquiryForm accepts valid Indian phone formats', () => {
  const validWithPlus91 = validateEnquiryForm({
    name: 'Ananya Nair',
    phone: '+91 98765 43210',
    program: 'Barbell Strength',
    branch: 'Bengaluru — Indiranagar',
  });
  assert.equal(validWithPlus91.valid, true);
  assert.deepEqual(validWithPlus91.errors, {});

  const validTenDigit = validateEnquiryForm({
    name: 'Vikramjit Singh',
    phone: '8959690529',
    program: 'Metabolic Turf Conditioning',
    branch: 'Mumbai — Bandra West',
  });
  assert.equal(validTenDigit.valid, true);
});

test('clampSliderPercentage bounds values between 5 and 95', () => {
  assert.equal(clampSliderPercentage(-10), 5);
  assert.equal(clampSliderPercentage(0), 5);
  assert.equal(clampSliderPercentage(50), 50);
  assert.equal(clampSliderPercentage(99), 95);
  assert.equal(clampSliderPercentage(Number.NaN), 50);
});

test('carousel index math respects visible cards and bounds', () => {
  assert.equal(getMaxCarouselIndex(6, 3), 3);
  assert.equal(getMaxCarouselIndex(6, 2), 4);
  assert.equal(getMaxCarouselIndex(6, 1), 5);
  assert.equal(stepCarouselIndex(0, -1, 6, 3), 0);
  assert.equal(stepCarouselIndex(0, 1, 6, 3), 1);
  assert.equal(stepCarouselIndex(3, 1, 6, 3), 3);
});

test('formatINR formats Indian currency properly and getPageMetadata returns distinct titles', () => {
  assert.equal(formatINR(6500), '₹6,500');
  assert.equal(formatINR(48000), '₹48,000');

  const homeMeta = getPageMetadata('home');
  const pricingMeta = getPageMetadata('pricing');
  assert.notEqual(homeMeta.title, pricingMeta.title);
  assert.ok(pricingMeta.title.includes('Pricing'));
});
